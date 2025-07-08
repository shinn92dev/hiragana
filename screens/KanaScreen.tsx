import KanaRow from "@/components/custom/KanaRow";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

import { HIRAGANA } from "@/constants/Kana";
import { FlatList } from "react-native";
const KanaScreen = () => {
  return (
    <Box className="">
      <FlatList
        data={HIRAGANA}
        keyExtractor={(item) => item.title}
        renderItem={(item) => <KanaRow rowObj={item.item} />}
        className="bg-white"
        ListFooterComponent={
          <Box className="p-4 h-16 bg-locked-bg rounded-xl flex-row items-center">
            <Text className="text-center text-lg font-bold flex-row items-center h-full">
              Final Boss Slot Appears after beating everything
            </Text>
          </Box>
        }
      />
    </Box>
  );
};

export default KanaScreen;
