import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image, StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.image}
      />
      <ThemedText type="title">ADVICE GENERATOR </ThemedText>
      <ThemedText type="default" style={{ textAlign: "center" }}>
        Welcome! Head over to the "Advice" tab to get daily wisdom. Try it daily
        and it will definetly help you
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    gap: 25,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
