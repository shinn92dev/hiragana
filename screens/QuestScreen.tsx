import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

import { Input, InputField } from "@/components/ui/input";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import { HIRAGANA_ORDER } from "@/constants/Progress";
import { QUEST_WORDS } from "@/constants/Quest";
import { getAllKanaStatus, updateKanaStatus } from "@/db/db";

import { useEffect, useRef, useState } from "react";

import {
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const QuestScreen = () => {
  const textInputRef = useRef<React.ElementRef<typeof InputField>>(null);
  const [words, setWords] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [myHP, setMyHP] = useState(5);
  const [monsterHP, setMonsterHP] = useState(5);
  const [currentKey, setCurrentKey] = useState("");
  const [gameStatus, setGameStatus] = useState<
    "playing" | "victory" | "defeat"
  >("playing");
  const router = useRouter();

  const handleInputChange = (text: string) => {
    setInputText(text);
  };
  // const updateStatus = async () => {
  //   try {
  //     const currentKeyIdx = HIRAGANA_ORDER.findIndex(
  //       (key) => key == currentKey
  //     );
  //     if (currentIndex === -1) {
  //       console.error(`Error: Key "${currentKey}" not found in KANA_ORDER.`);
  //       return;
  //     }
  //     console.log(
  //       `Updating current key "${currentKey}": highlight=false, unlock=true`
  //     );
  //     await updateKanaStatus(currentKey, false, true);

  //     const nextKey = HIRAGANA_ORDER[currentKeyIdx + 1];
  //     if (nextKey) {
  //       console.log(
  //         `Updating next key "${nextKey}": highlight=true, unlock=true`
  //       );
  //       await updateKanaStatus(nextKey, true, true);
  //     } else {
  //       console.log("🎉 Congratulations! You have completed all lessons.");
  //     }
  //   } catch (error) {
  //     console.error("❌ Failed to unlock next kana:", error);
  //   }
  // };

  const handleVictory = async () => {
    console.log("Victory");
    try {
      const currentKeyIdx = HIRAGANA_ORDER.findIndex(
        (key) => key === currentKey
      );

      // 버그 수정: currentIndex -> currentKeyIdx
      if (currentKeyIdx === -1) {
        console.error(`Error: Key "${currentKey}" not found in KANA_ORDER.`);
        return;
      }

      // 현재 스테이지 업데이트 (highlight: false)
      await updateKanaStatus(currentKey, false, true);

      // 다음 스테이지 업데이트 (highlight: true)
      const nextKey = HIRAGANA_ORDER[currentKeyIdx + 1];
      if (nextKey) {
        await updateKanaStatus(nextKey, true, true);
      } else {
        console.log("🎉 All stage clear!");
      }

      // TODO: 잠시 후 승리 화면으로 이동
      router.push({ pathname: "/kana" });

      // 예: setTimeout(() => navigation.navigate('Victory'), 1000);
    } catch (error) {
      console.error("❌ Failed to unlock next kana:", error);
    }
  };
  const handleDefeat = () => {
    console.log("Fail...");
    // TODO: 잠시 후 패배 화면 또는 이전 화면으로 이동
    // 예: setTimeout(() => navigation.goBack(), 1000);
  };

  const handleAttack = () => {
    if (inputText === currentWord) {
      setIsCorrect(true);
      setMonsterHP((prevHP) => prevHP - 1);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setInputText("");
        setIsCorrect(false);
      }, 1000);
    } else {
      setMyHP((prevHP) => prevHP - 1);
    }
    setInputText("");
  };

  useEffect(() => {
    const fetchQuestWords = async () => {
      const status = await getAllKanaStatus();
      if (!status) {
        console.error("Cannot retrive KanaStatus.");
        return;
      }
      const highlightedKey = Object.keys(status).find(
        (key) => status[key].highlight === true
      );
      if (!highlightedKey) {
        console.error("Cannot find highlighted key.");
        return;
      }
      setCurrentKey(highlightedKey);
      const selectedWords = QUEST_WORDS[highlightedKey];
      shuffle(selectedWords);
      setWords(selectedWords);
    };
    fetchQuestWords();
  }, []);
  useEffect(() => {
    console.log(words);
  }, [words]);

  useEffect(() => {
    // 몬스터 HP가 0이 되면 승리 처리
    if (monsterHP <= 0) {
      setGameStatus("victory");
      handleVictory();
    }
    // 내 HP가 0이 되면 패배 처리
    if (myHP <= 0) {
      setGameStatus("defeat");
      handleDefeat();
    }
  }, [monsterHP, myHP]); // monsterHP 또는 myHP가 변경될 때마다 이 효과를 실행

  const currentWord = words[currentIndex];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={48}
    >
      <Box className="flex-1">
        <Box
          style={[
            styles.animationContainer,
            { backgroundColor: isCorrect ? "lightgreen" : "coral" },
          ]}
          className="flex-col justify-center items-center"
        >
          <Box className="flex-row w-full justify-between px-10">
            <Text>My HP: {myHP}</Text>
            <Text>Monster HP: {monsterHP}</Text>
          </Box>
          <Text>Animation will be located here.</Text>
        </Box>

        <Box
          style={styles.questionContainer}
          className="flex-row justify-center items-center gap-x-3"
        >
          {currentWord
            ? [...currentWord].map((char, index) => (
                <Text
                  key={index}
                  className="border mx-2 text-3xl font-bold h-10 px-2 rounded-xl"
                  style={styles.charContainer}
                >
                  {char}
                </Text>
              ))
            : null}
        </Box>

        <Box className="w-full flex-row items-center">
          <Input className="flex-1 h-20 font-bold" size="xl">
            <InputField
              ref={textInputRef}
              placeholder="Defeat the Monster! Type here to attack!"
              autoFocus={true}
              blurOnSubmit={false}
              value={inputText}
              onChangeText={handleInputChange}
            />
          </Input>
          <Button
            onPress={handleAttack}
            className="h-20"
            disabled={myHP <= 0 || monsterHP <= 0 || !inputText}
          >
            <ButtonText className="text-white font-bold text-xl">
              Attack
            </ButtonText>
          </Button>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default QuestScreen;

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
  },
  questionContainer: {
    height: 70,
    backgroundColor: "yellow",
  },
  charContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
