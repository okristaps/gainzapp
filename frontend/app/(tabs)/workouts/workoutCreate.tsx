import { DefaultFlatlist } from "components/flatlist";
import { RenderItem } from "components/flatlist/components";
import Header from "components/header";
import Wrapper from "components/layout/wrapper";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

import Info from "assets/images/info.svg";
import { PirmaryButtonEmpty } from "components/common/primarybutton";
import { Input } from "components/inputs/input";
import { Exercise } from "types/index";

export default function TabWorkoutsCreate() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [name, setName] = useState("Full body strength training");
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Wrapper>
      <Header
        title={id ? "Edit" : "Create Workout"}
        iconLeft={{ text: "Cancel", hideText: false, onPress: () => router.back() }}
        iconRight={{ text: "Save", hideText: false, onPress: () => router.back() }}
      />

      <Input placeholder="Workout name" value={name} setValue={setName} type="book" />
      <DefaultFlatlist
        emptyText="No exercises added yet"
        title="Excercises"
        data={exercises}
        isLoading={false}
        renderItem={(item) => <RenderItem item={item.item} customIconRight={<Info />} />}
      />
      <PirmaryButtonEmpty
        text="+ Add exercises"
        onPress={() => {
          router.push({
            pathname: "workouts/exercisesSelect",
            params: { id: "sad" },
          });
        }}
      />
    </Wrapper>
  );
}
