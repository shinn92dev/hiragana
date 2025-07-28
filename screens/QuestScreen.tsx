import { Box } from "@/components/ui/box";

import { Input, InputField } from "@/components/ui/input";

import { Text } from "@/components/ui/text";
import { QUEST_WORDS } from "@/constants/Quest";
import { getAllKanaStatus } from "@/db/db";

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

  const handleInputChange = (text: string) => {
    setInputText(text);

    if (text == currentWord) {
      setCurrentIndex(currentIndex + 1);
      setInputText("");
    }
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
      const selectedWords = QUEST_WORDS[highlightedKey];
      shuffle(selectedWords);
      setWords(selectedWords);
    };
    fetchQuestWords();
  }, []);
  useEffect(() => {
    console.log(words);
  }, [words]);
  const currentWord = words[currentIndex];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={48}
    >
      <Box className="flex-1">
        <Box
          style={styles.animationContainer}
          className="flex-row justify-center items-center"
        >
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

        <Input className="w-full h-20 font-bold" size="xl">
          <InputField
            ref={textInputRef}
            placeholder="Defeat the Monster! Type here to attack!"
            autoFocus={true}
            blurOnSubmit={false}
            value={inputText}
            onChangeText={handleInputChange}
          />
        </Input>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default QuestScreen;

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    backgroundColor: "coral",
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
