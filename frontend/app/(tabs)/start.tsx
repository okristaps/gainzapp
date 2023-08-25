import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function TabStartScreen() {
  return (
    <View style={styles.container}>
      <Text> START </Text>
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
