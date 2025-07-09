import { Box } from "../ui/box";
import { Pressable } from "../ui/pressable";
import { StyleSheet, Text } from "react-native";
const QuestFooter = () => {
  return (
    <Pressable className="w-full py-5 my-10">
      <Box className="w-4/5 bg-highlight-border" style={styles.buttonContainer}>
        <Text style={styles.text}>Quest</Text>
      </Box>
    </Pressable>
  );
};

export default QuestFooter;

const styles = StyleSheet.create({
  buttonContainer: {
    // width: "80%",
    alignSelf: "center",
    // backgroundColor: "#FFD900",
    borderRadius: 12,
    paddingVertical: 7,
    // opacity: 0.9,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    display: "flex",
    width: "100%",
    textAlign: "center",
    color: "#FC4848",
  },
});
