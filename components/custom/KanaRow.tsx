import { Letter } from "@/models/Letter";
import { Box } from "../ui/box";
import KanaItem from "./KanaItem";
import { Image } from "../ui/image";
import { useEffect, useState } from "react";
import { getKanaStatus } from "@/db/db";

interface KanaRowProps {
  rowObj: {
    title: string;
    imgPath: string;
    data: (Letter | null)[];
  };
}

const KanaRow: React.FC<KanaRowProps> = ({ rowObj }) => {
  const kanaItems = rowObj.data;
  const [status, setStatus] = useState<{
    highlight: boolean | null;
    unlock: boolean | null;
  }>({ highlight: null, unlock: null });
  useEffect(() => {
    const loadData = async () => {
      if (kanaItems && kanaItems[0]) {
        const storedStatus = await getKanaStatus(kanaItems[0].title);
        if (storedStatus) {
          setStatus(storedStatus);
        }
      }
    };
    loadData();
  }, []);
  return (
    <Box
      className={`
        flex flex-row w-full my-1 px-1 py-2 rounded-lg
        ${status.highlight && "bg-unlocked-bg border-unlocked-border border-2"}
        ${status.unlock ? "bg-unlocked-bg" : "bg-locked-bg"}
        `}
    >
      <Box className="w-4/5 flex flex-row gap-1">
        {kanaItems.map((item, index) => {
          if (item !== null) {
            return (
              <KanaItem
                key={item.kana}
                kana={item.kana}
                yomi={item.yomi}
                sound={item.soundUrl}
                title={item.title}
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
