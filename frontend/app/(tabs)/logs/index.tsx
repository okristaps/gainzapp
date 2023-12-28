import { RenderItem } from "components/flatlist/components";
import Header from "components/header";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLogsScreen() {
  return (
    <View className="flex flex-1">
      <Header title={"Logs"} />
      <RenderItem
        item={{ _id: "1", name: "Past Workouts" }}
        onPress={() => router.push({ pathname: "logs/pastWorkouts" })}
      />
      <RenderItem item={{ _id: "2", name: "Exercise Progress" }} extraClassname="mt-[10px]" />
      <RenderItem item={{ _id: "3", name: "Measurments" }} extraClassname="mt-[10px]" />
    </View>
  );
}
