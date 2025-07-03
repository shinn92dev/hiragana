import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
const KanaDetailScreen = () => {
  const { kana, yomi, sound } = useLocalSearchParams();
  return (
    <Box className="flex-1 h-[100vh] bg-red-300">
      <Pressable className="w-full h-full flex-col items-center justify-center bg-red-300">
        <Text className="text-center font-bold text-6xl bg-red-300">
          {kana}
        </Text>
        <Text>{yomi}</Text>
      </Pressable>
    </Box>
  );
};
export default KanaDetailScreen;
