import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
// import { Text } from "@/components/ui/text";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
const KanaDetailScreen = () => {
  const { kana, yomi, sound } = useLocalSearchParams();
  return (
    <Box className="flex-1 bg-red-300">
      <Pressable
        className="w-full h-full flex-col items-center justify-center"
        style={styles.button}
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
    fontSize: 200,
    fontWeight: "bold",
  },
  yomi: {
    fontSize: 50,
  },
  button: {
    backgroundColor: "yellow",
  },
});
