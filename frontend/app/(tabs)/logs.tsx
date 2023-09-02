import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
