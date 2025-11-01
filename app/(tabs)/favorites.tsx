import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const FavoritesScreen = () => {
  interface SavedAdvices {
    id: number;
    advice: string;
  }
  const [savedAdvices, setSavedAdvices] = useState<SavedAdvices[]>([]);

  const loadFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem("favorites");
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      setSavedAdvices(favorites);
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Chosen advices
      </ThemedText>
      <FlatList
        data={savedAdvices}
        keyExtractor={(item) => item.id.toString()} //returns string
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <ThemedText>{item.advice}</ThemedText>
          </View>
        )}
        ListEmptyComponent={() => (
          <ThemedText style={styles.emptyText}>
            There is nothing saved yet
          </ThemedText>
        )}
      />
    </ThemedView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginVertical: 24,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: `rgba(255,255,255,0.1)`,
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    opacity: 0.5,
  },
});
