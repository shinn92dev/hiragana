import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { KANA_AUDIO } from "@/constants/KanaAudio";
import { useState } from "react";

const KanaDetailScreen = () => {
  const { kana, yomi, sound } = useLocalSearchParams();
  console.log(sound);
  const playKanaAudio = async () => {
    try {
      const localSound = KANA_AUDIO[sound as string];
      if (!localSound) {
        throw new Error(`No local audio found for sound: ${sound}`);
      }

      const { sound: playbackObject } = await Audio.Sound.createAsync(
        localSound,
        { shouldPlay: true }
      );
    } catch (error) {
      console.error("❌ Sound play error:", error);
    }
  };
  const [isPressed, setIsPressed] = useState(false);
  const handleKanaPress = () => {
    setIsPressed(true);
    playKanaAudio();
    setTimeout(() => setIsPressed(false), 900);
  };
  return (
    <Box className="flex-1">
      <Pressable
        className="w-full h-full flex-col items-center justify-center"
        style={[styles.button, isPressed ? styles.buttonPressed : null]}
        onPress={() => {
          handleKanaPress();
        }}
      >
        <Text style={styles.title}>{kana}</Text>
        <Text className="" style={styles.yomi}>
          {yomi}
        </Text>
      </Pressable>
    </Box>
  );
};
export default KanaDetailScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 300,
    fontWeight: "bold",
    color: "#F7FFFF",
  },
  yomi: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#F7FFFF",
  },
  button: {
    backgroundColor: "#FC4848",
  },
  buttonPressed: {
    backgroundColor: "black",
  },
});
