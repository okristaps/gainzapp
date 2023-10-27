import { DefaultFlatlist } from "components/flatlist";
import { RenderItem } from "components/flatlist/components";
import Header from "components/header";
import Wrapper from "components/layout/wrapper";
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";

import Info from "assets/images/info.svg";
import { PirmaryButtonEmpty } from "components/common/primarybutton";
import { Input } from "components/inputs/input";
import { TouchableOpacity, View } from "react-native";
import { WorkoutsContext } from "./context/workoutsContext";

import Bin from "assets/images/trash.svg";

export default function TabWorkoutsCreate() {
  const { selectedExercises, handleExercises } = useContext(WorkoutsContext);
  const [name, setName] = useState("");
  const { id } = useLocalSearchParams<{ id: string }>();

  const Item = ({
    item,
  }: {
    item: {
      _id: string;
      name: string;
    };
  }) => {
    return (
      <View className="flex flex-row items-center w-[100%]">
        <TouchableOpacity className="mr-[9px]" onPress={() => handleExercises(item)}>
          <Bin height={24} width={24} />
        </TouchableOpacity>
        <View className="max-w-[300px]">
          <RenderItem item={item} customIconRight={<Info />} />
        </View>
      </View>
    );
  };

  return (
    <Wrapper>
      <Header
        title={id ? "Edit" : "Create Workout"}
        iconLeft={{ text: "Cancel", hideText: false, onPress: () => router.back() }}
        iconRight={{ text: "Save", hideText: false, onPress: () => router.back() }}
      />

      <Input placeholder="Enter workout name..." value={name} setValue={setName} type="book" />
      <DefaultFlatlist
        emptyText="No exercises added yet"
        title="Excercises"
        data={selectedExercises}
        isLoading={false}
        renderItem={Item}
      />
      <View className="mt-[10px]">
        <PirmaryButtonEmpty
          text="+ Add exercises"
          onPress={() => {
            router.push({
              pathname: "workouts/exercisesSelect",
              params: { id: "sad" },
            });
          }}
        />
      </View>
    </Wrapper>
  );
}
