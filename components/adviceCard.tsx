import React from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface AdviceCardProps {
  advice: string;
  isLoading: boolean;
}

const AdviceCard = (props: AdviceCardProps) => {
  const { isLoading, advice } = props;
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("../assets/images/dark.png")}
        style={styles.image}
        resizeMode="contain"
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ThemedText type="title">{advice}</ThemedText>
      )}
    </ThemedView>
  );
};

export default AdviceCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: Dimensions.get("window").width,
    height: undefined,
    aspectRatio: 1,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
});
