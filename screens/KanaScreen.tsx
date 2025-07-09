import KanaRow from "@/components/custom/KanaRow";
import QuestFooter from "@/components/custom/QuestFooter";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

import { HIRAGANA } from "@/constants/Kana";
import { FlatList } from "react-native";
const KanaScreen = () => {
  return (
    <Box className="flex-1 relative bg-white">
      <FlatList
        data={HIRAGANA}
        keyExtractor={(item) => item.title}
        renderItem={(item) => <KanaRow rowObj={item.item} />}
        className="bg-white"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListFooterComponent={
          <Box className="p-4 h-16 bg-locked-bg rounded-xl flex-row items-center">
            <Text className="text-center text-lg font-bold flex-row items-center h-full">
              Final Boss Slot Appears after beating everything
            </Text>
          </Box>
        }
      />
      <Box className="absolute bottom-0 w-full">
        <QuestFooter />
      </Box>
    </Box>
  );
};

export default KanaScreen;
