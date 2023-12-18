import SecondaryTitle from "components/common/secondaryTitle";

import Header from "components/header";
import { Input } from "components/inputs/input";
import { router } from "expo-router";
import React, { useCallback, useContext, useState } from "react";

import { View } from "react-native";
import { ExerciseIdentifier } from "types/index";
import { WorkoutsContext } from "../../contexts/workoutsContext";
import RenderExerciseList from "./components/exerciseList";
import colors from "constants/colors";

export default function TabExercisesSelect() {
  const [searchText, setSearchText] = useState("");

  const [visible, setVisible] = useState(false);
  const { selectedExercises, setSelectedExercises } = useContext(WorkoutsContext);

  const [tempSelectedExercises, setTempSelectedExercises] = useState<ExerciseIdentifier[]>(
    selectedExercises ?? []
  );

  const handleRouterBack = useCallback(() => {
    setSelectedExercises(tempSelectedExercises);
    router.back();
  }, [tempSelectedExercises]);

  return (
    <View className="flex flex-1">
      <Header
        extraClassname="h-[50px]"
        title="Add Exercises"
        iconLeft={{
          text: "Save",
          color: colors.success,
          hideText: false,
          onPress: () => handleRouterBack(),
        }}
        iconRight={{
          text: "Filter",
          onPress: () => setVisible(true),
        }}
      />
      <SecondaryTitle text={"Custom workout 1"} />
      <Input
        placeholder="Search..."
        onValueChange={setSearchText}
        extraClass={"mt-[15px] mb-[15px]"}
        type="search"
        debounceEnabled
      />

      <RenderExerciseList
        tempSelectedExercises={tempSelectedExercises}
        setTempSelectedExercises={setTempSelectedExercises}
        visible={visible}
        setVisible={setVisible}
        debouncedSearchText={searchText}
      />
    </View>
  );
}
