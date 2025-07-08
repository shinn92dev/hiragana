import KanaRow from "@/components/custom/KanaRow";

import { HIRAGANA } from "@/constants/Kana";
import { FlatList } from "react-native";
const KanaScreen = () => {
  return (
    <FlatList
      data={HIRAGANA}
      keyExtractor={(item) => item.title}
      renderItem={(item) => <KanaRow rowObj={item.item} />}
      className="bg-white"
    />
  );
};

export default KanaScreen;
