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
  return (
    <Box className="flex flex-row w-full my-5 px-2">
      <Box className="w-4/5 flex flex-row gap-2">
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
            return (
              <Box
                key={`empty-${index}`} // null 요소는 고유한 key가 없으므로 index를 사용합니다.
                className="w-16" // KanaItem과 유사한 flex 속성
              />
            );
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
