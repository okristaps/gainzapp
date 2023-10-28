import { DefaultFlatlist } from "components/flatlist";
import { EmptyComponent, RenderItem } from "components/flatlist/components";
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
import { FlashList } from "@shopify/flash-list";
import { Divider } from "components/loginform/components";

export default function TabWorkoutsCreate() {
  const { selectedExercises, handleExercises, selectedWorkout } = useContext(WorkoutsContext);
  const [name, setName] = useState("");

  const Item = ({
    item,
  }: {
    item: {
      _id: string;
      name: string;
    };
  }) => {
    console.log(item);
    return (
      <View className={`flex flex-1 flex-row items-center`}>
        <TouchableOpacity className="mr-[9px]" onPress={() => handleExercises(item)}>
          <Bin height={24} width={24} />
        </TouchableOpacity>
        <View className="flex-1">
          <RenderItem item={item} customIconRight={<Info />} />
        </View>
      </View>
    );
  };

  return (
    <Wrapper>
      <Header
        title={selectedWorkout ? "Edit" : "Create Workout"}
        iconLeft={{
          text: "Cancel",
          hideText: false,
          onPress: () => router.push({ pathname: "workouts/workoutInfo" }),
        }}
        iconRight={{ text: "Save", hideText: false, onPress: () => router.back() }}
      />

      <Input placeholder="Enter workout name..." value={name} setValue={setName} type="book" />
      <Divider text={"Exercises"} textSize={28} extraClassName="mt-[25px]" />
      <View className="mt-[10px] flex flex-1">
        <FlashList
          ListEmptyComponent={<EmptyComponent isLoading={false} text={"No exercises found yey"} />}
          data={selectedExercises}
          ItemSeparatorComponent={() => <View className="h-[10px]" />}
          estimatedItemSize={40}
          renderItem={Item}
        />
      </View>
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
