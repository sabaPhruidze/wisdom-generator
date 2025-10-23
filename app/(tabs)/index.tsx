import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AdviceCard from "../../components/adviceCard";

export default function HomeScreen() {
  const [advice, setAdvice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => setAdvice(data.slip.advice))
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <View style={styles.container}>
      <AdviceCard advice={advice} isLoading={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
