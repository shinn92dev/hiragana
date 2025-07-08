import { useRouter } from "expo-router";
import { Box } from "../ui/box";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";

interface KanaItemProps {
  kana: string;
  yomi: string;
  sound: string;
}

const KanaItem: React.FC<KanaItemProps> = ({ kana, yomi, sound }) => {
  const router = useRouter();
  const handlePress = (kana: string, yomi: string, sound: string) => {
    router.push({
      pathname: "/kanaDetail",
      params: {
        kana: kana,
        yomi: yomi,
        sound: sound,
      },
    });
  };
  return (
    <Pressable
      className="w-16 h-16"
      onPress={() => handlePress(kana, yomi, sound)}
    >
      {({ pressed }) => (
        <Box
          className={`w-full h-full flex-col items-center justify-center bg-unlocked-box border rounded-md ${
            pressed && "bg-red-200"
          }`}
        >
          <Text className="font-bold text-4xl text-unlocked-text">{kana}</Text>
          <Text className="text-sm text-unlocked-text">{yomi}</Text>
        </Box>
      )}
    </Pressable>
  );
};

export default KanaItem;
