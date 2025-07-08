import { Letter } from "@/models/Letter";
import { Box } from "../ui/box";
import KanaItem from "./KanaItem";
import { Image } from "../ui/image";

interface KanaRowProps {
  rowObj: {
    title: string;
    imgPath: string;
    data: Letter[];
  };
}

const KanaRow: React.FC<KanaRowProps> = ({ rowObj }) => {
  const kanaItems = rowObj.data;
  console.log(kanaItems);
  return (
    <Box className="flex flex-row w-full my-1 px-2 py-3 bg-unlocked-bg rounded-lg border-unlocked-border border-2">
      <Box className="w-4/5 flex flex-row gap-1">
        {kanaItems.map((item, index) => {
          if (item !== null) {
            return (
              <KanaItem
                key={item.kana}
                kana={item.kana}
                yomi={item.yomi}
                sound={item.soundUrl}
              />
            );
          } else {
            return <Box key={`empty-${index}`} className="w-16" />;
          }
        })}
      </Box>
      {/* Placeholder for boss image */}
      <Box className="w-1/5 h-full bg-violet-400"></Box>
      {/* <Image className="w-1/5" source={}/> */}
    </Box>
  );
};

export default KanaRow;
