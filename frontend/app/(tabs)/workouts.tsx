import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function TabWorkoutsScreen() {
  return (
    <View style={styles.container}>
      <Text> Workouts</Text>
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
