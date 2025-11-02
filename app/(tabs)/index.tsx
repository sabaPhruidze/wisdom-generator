import { ThemedText } from "@/components/themed-text";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import AdviceCard from "../../components/adviceCard";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  interface AdviceSlip {
    id: number;
    advice: string;
  }

  const [adviceSlip, setAdviceSlip] = useState<AdviceSlip | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvice = () => {
    setIsLoading(true);
    setError(null);
    fetch(`https://api.adviceslip.com/advice?cacheBuster=${Date.now()}`)
      .then((response) => response.json())
      .then((data) => setAdviceSlip(data.slip))
      .catch((error) => {
        console.error(error);
        setAdviceSlip(null);
        setError("Connection error, try again later");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleSave = async () => {
    if (!adviceSlip) return;
    try {
      //ძველი, უკვე შენახული რჩევები
      const existingFavorites = await AsyncStorage.getItem("favorites");
      //გადააქციე ტექსტი (JSON) მასივად. თუ ცარიელია, შექმენი ახალი მასივი
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      // ხომ არ არის ეს რჩევა უკვე შენახული
      const isAlreadySaved = favorites.some(
        (fav: AdviceSlip) => fav.id === adviceSlip.id
      );

      if (isAlreadySaved) {
        Alert.alert("Already saved!!!", "This advice is already inside the ");
        return;
      }
      const newFavorites = [adviceSlip, ...favorites];
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
      Alert.alert("Saved", "Advice is already added in the notebook");
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Advices couldn't be saved");
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);
  return (
    <View style={styles.container}>
      <AdviceCard
        advice={adviceSlip ? adviceSlip.advice : ""}
        isLoading={isLoading}
        error={error}
        onSave={handleSave}
      />
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
