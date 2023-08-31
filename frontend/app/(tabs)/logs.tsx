import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function TabLogsScreen() {
  return (
    <View style={styles.container}>
      <Text> Logs </Text>
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