import React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";

export default function TabMoreScreen() {
  return (
    <View style={styles.container}>
      <Text> More </Text>
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
