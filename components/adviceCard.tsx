import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface AdviceCardProps {
  advice: string;
  isLoading: boolean;
  error: string | null;
  onSave: () => void; //ველოდები onSave prop-ს, რომელიც არის ფუნქცია"
}

const AdviceCard = (props: AdviceCardProps) => {
  const { isLoading, advice, error, onSave } = props;
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
        <>
          <ThemedText type="title" style={styles.adviceText}>
            {advice}
          </ThemedText>
          <Pressable onPress={onSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save the Advice</Text>
          </Pressable>
        </>
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
  saveButton: {
    marginTop: 24,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
