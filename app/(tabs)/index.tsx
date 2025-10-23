import { ThemedText } from "@/components/themed-text";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AdviceCard from "../../components/adviceCard";

export default function HomeScreen() {
  const [advice, setAdvice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvice = () => {
    setIsLoading(true);
    setError(null);
    fetch(`https://api.adviceslip.com/advice?cacheBuster=${Date.now()}`)
      .then((response) => response.json())
      .then((data) => setAdvice(data.slip.advice))
      .catch((error) => () => {
        console.error(error);
        setAdvice("");
        setError("კავშირის შეცდომა. სცადეთ თავიდან.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAdvice();
  }, []);
  return (
    <View style={styles.container}>
      <AdviceCard advice={advice} isLoading={isLoading} error={error} />
      <Pressable
        onPress={fetchAdvice}
        disabled={isLoading}
        style={[styles.button, isLoading && styles.buttonDisabled]}
      >
        <ThemedText style={styles.buttonText}>New advice</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonDisabled: {
    backgroundColor: "#999999",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
  },
});
