import { RenderItem } from "components/flatlist/components";
import Header from "components/header";
import Wrapper from "components/layout/wrapper";
import { router } from "expo-router";
import React from "react";

export default function TabLogsScreen() {
  return (
    <Wrapper>
      <Header title={"Logs"} />
      <RenderItem
        item={{ _id: "1", name: "Past Workouts" }}
        onPress={() => router.push({ pathname: "logs/pastWorkouts" })}
      />
      <RenderItem item={{ _id: "2", name: "Exercise Progress" }} extraClassname="mt-[10px]" />
    </Wrapper>
  );
}
