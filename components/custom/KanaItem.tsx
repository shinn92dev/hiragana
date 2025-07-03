import { Box } from "../ui/box";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";

interface KanaItemProps {
  kana: string;
  yomi: string;
}

const KanaItem: React.FC<KanaItemProps> = ({ kana, yomi }) => {
  return (
    <Pressable className="w-16 h-16">
      {({ pressed }) => (
        <Box
          className={`w-full h-full flex-col items-center justify-center border bg-red-400 ${
            pressed && "bg-red-200"
          }`}
        >
          <Text>{kana}</Text>
          <Text>{yomi}</Text>
        </Box>
      )}
    </Pressable>
  );
};

export default KanaItem;
