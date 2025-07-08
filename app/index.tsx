import React, { useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

import { Link } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import { getAllKanaStatus, getKanaStatus, initializeKanaStatus } from "@/db/db";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const initStatus = async () => {
      await initializeKanaStatus();
    };
    initStatus();
    const getStatus = async () => {
      const status = await getAllKanaStatus();
      console.log(status);
    };
    getStatus();
  }, []);
  return (
    <Box className="flex-1 h-[100vh] pt-10 px-3 flex-col justify-center items-center gap-10">
      <Box className="w-1/2 h-20">
        <Pressable
          className="w-full h-full"
          onPress={() => {
            router.push({ pathname: "/kana" });
          }}
        >
          {({ pressed }) => (
            <Box
              className={`w-full h-full flex items-center justify-center border rounded-lg bg-amber-500 ${
                pressed && "bg-amber-300"
              }`}
            >
              <Text className="text-center">Hiragana</Text>
              <Text>ひらがな</Text>
            </Box>
          )}
        </Pressable>
      </Box>
      <Box className="w-1/2 h-20">
        <Pressable className="w-full h-full">
          {({ pressed }) => (
            <Box
              className={`w-full h-full flex items-center justify-center border rounded-lg bg-amber-500 ${
                pressed && "bg-amber-300"
              }`}
            >
              <Text className="text-center">Katakana</Text>
              <Text>カタカナ</Text>
            </Box>
          )}
        </Pressable>
      </Box>
    </Box>
  );
}
