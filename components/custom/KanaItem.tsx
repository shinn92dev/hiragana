import { useRouter } from "expo-router";
import { Box } from "../ui/box";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import { useEffect, useState } from "react";
import { getKanaStatus } from "@/db/db";

interface KanaItemProps {
  kana: string;
  yomi: string;
  sound: string;
  title: string;
}

const KanaItem: React.FC<KanaItemProps> = ({ kana, yomi, sound, title }) => {
  const [status, setStatus] = useState<{
    highlight: boolean | null;
    unlock: boolean | null;
  }>({ highlight: null, unlock: null });
  useEffect(() => {
    const loadData = async () => {
      const storedStatus = await getKanaStatus(title);
      if (storedStatus) {
        setStatus(storedStatus);
      }
    };
    loadData();
  }, []);

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
      onPress={() => {
        if (status.unlock) {
          handlePress(kana, yomi, sound);
        }
      }}
    >
      {({ pressed }) => (
        <Box
          className={`
            w-full h-full flex-col items-center justify-center
            ${status.highlight && "bg-unlocked-box"}
            ${!status.unlock && "bg-locked-box"}
            rounded-md ${pressed && status.unlock && "bg-red-200"}`}
        >
          <Text
            className={`font-bold text-4xl ${
              status.unlock ? "text-unlocked-text" : "text-locked-text"
            }`}
          >
            {kana}
          </Text>
          <Text
            className={`text-md ${
              status.unlock ? "text-unlocked-text" : "text-locked-text"
            }`}
          >
            {yomi}
          </Text>
        </Box>
      )}
    </Pressable>
  );
};

export default KanaItem;
