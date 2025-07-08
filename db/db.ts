import AsyncStorage from "@react-native-async-storage/async-storage";
import { KANA_STATUS } from "@/constants/Progress";

type KanaStatus = {
  [key: string]: KanaStatusItems;
};
interface KanaStatusItems {
  highlight: boolean;
  unlock: boolean;
}

export const initializeKanaStatus = async () => {
  try {
    const exist = await AsyncStorage.getItem("kanaStatus");
    if (!exist) {
      await AsyncStorage.setItem("kanaStatus", JSON.stringify(KANA_STATUS));
    }
  } catch (error) {
    console.error("❌Failed to initialize KANA STATUS:", error);
  }
};

export const getAllKanaStatus = async () => {
  const stored = await AsyncStorage.getItem("kanaStatus");

  if (!stored) {
    throw Error("kanaStatus does not exist");
  }

  if (stored) {
    const parsedStatus: KanaStatus = JSON.parse(stored);
    return parsedStatus;
  }
};

export const getKanaStatus = async (key: string) => {
  try {
    const stored = await AsyncStorage.getItem("kanaStatus");
    if (!stored) {
      throw Error("kanaStatus does not exist");
    }
    if (stored) {
      const parsedStatus: KanaStatus = JSON.parse(stored);
      if (!(key in parsedStatus)) {
        throw Error(`${key} does not exist in kanaStatus`);
      }
      return parsedStatus[key];
    }
  } catch (error) {
    console.error("❌ Failed to get kana status:", error);
  }
};

export const updateKanaStatus = async (
  key: string,
  highlight: boolean,
  unlock: boolean
) => {
  try {
    const stored = await AsyncStorage.getItem("kanaStatus");
    if (!stored) {
      throw Error("kanaStatus does not exist.");
    }
    if (stored) {
      const parsedStatus = JSON.parse(stored);
      parsedStatus[key].unlock = unlock;
      parsedStatus[key].highlight = highlight;
      await AsyncStorage.setItem("kanaStatus", JSON.stringify(parsedStatus));
    }
  } catch (error) {
    console.error("❌ Failed to update kana status:", error);
  }
};

export const isAllUnlocked = async () => {
  try {
    const stored = await AsyncStorage.getItem("kanaStatus");
    if (!stored) {
      throw Error("kanaStatus does not exist.");
    }

    const parsedStatus: Record<string, KanaStatusItems> = JSON.parse(stored);

    const allUnlocked = Object.values(parsedStatus).every(
      (item) => item.unlock === true
    );

    return allUnlocked;
  } catch (error) {
    console.error("❌ Failed to get kana unlocked status:", error);
    return false;
  }
};
