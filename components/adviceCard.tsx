import React from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface AdviceCardProps {
  advice: string;
  isLoading: boolean;
  error: string | null;
}

const AdviceCard = (props: AdviceCardProps) => {
  const { isLoading, advice, error } = props;
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("../assets/images/dark.png")}
        style={styles.image}
        resizeMode="contain"
      />
      {isLoading ? (
        <ActivityIndicator
          size={50}
          style={{ marginTop: 16 }}
          color="#007AFF"
        />
      ) : error ? (
        <ThemedText type="title" style={styles.errorText}>
          {error}
        </ThemedText>
      ) : (
        <ThemedText type="title" style={styles.adviceText}>
          {advice}
        </ThemedText>
      )}
    </ThemedView>
  );
};

export default AdviceCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },

  adviceText: {
    textAlign: "center",
    marginTop: 16,
  },
  errorText: {
    textAlign: "center",
    marginTop: 16,
    color: "red",
  },
});
