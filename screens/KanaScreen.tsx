import KanaRow from "@/components/custom/KanaRow";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HIRAGANA } from "@/constants/Kana";
import { FlatList } from "react-native";
const KanaScreen = () => {
  return (
    <FlatList
      data={HIRAGANA}
      keyExtractor={(item) => item.title}
      renderItem={(item) => <KanaRow rowObj={item.item} />}
    />
  );
};

export default KanaScreen;
