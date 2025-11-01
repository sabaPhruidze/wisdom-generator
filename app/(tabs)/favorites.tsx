import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const FavoritesScreen = () => {
  interface SavedAdvices {
    id: string;
    advice: string;
  }
  const savedAdvices: SavedAdvices[] = [];
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Chosen advices
      </ThemedText>
      <FlatList
        data={savedAdvices}
        keyExtractor={(item) => item.id} //returns string
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
    marginBottom: 16,
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
