import SecondaryTitle from "components/common/secondaryTitle";
import useDebounce from "components/flatlist/helpers/searchDebounce";

import Header from "components/header";
import { Input } from "components/inputs/input";
import Wrapper from "components/layout/wrapper";
import { router } from "expo-router";
import React, { memo, useCallback, useContext, useState } from "react";

import ExercisesHorizontal from "components/flatlist/exerciseHorizontal";
import { Divider } from "components/loginform/components";
import { View } from "react-native";
import { ExerciseIdentifier } from "types/index";
import { ExerciseModalContext } from "../../contexts/exerciseModalContext";
import RenderExerciseList from "./components/exerciseList";
import { WorkoutsContext } from "../../contexts/workoutsContext";

export default function TabExercisesSelect() {
  const { setExercise } = useContext(ExerciseModalContext);
  const [searchText, setSearchText] = useState("");

  const [visible, setVisible] = useState(false);
  const { handleExercises, selectedExercises } = useContext(WorkoutsContext);

  const memoizedOnItemPress = useCallback(
    (item: ExerciseIdentifier) => {
      setExercise(item);
    },
    [setExercise]
  );

  return (
    <Wrapper>
      <Header
        extraClassname="h-[50px]"
        title="Add Exercises"
        iconLeft={{
          text: "Back",
          hideText: true,
          onPress: () => router.back(),
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
      <RenderLists
        visible={visible}
        setVisible={setVisible}
        selectedExercises={selectedExercises}
        handleExercises={handleExercises}
        memoizedOnItemPress={memoizedOnItemPress}
        debouncedSearchText={searchText}
      />
    </Wrapper>
  );
}

const RenderLists = memo(
  ({
    selectedExercises,
    handleExercises,
    memoizedOnItemPress,
    debouncedSearchText,
    visible,
    setVisible,
  }: {
    selectedExercises: ExerciseIdentifier[];
    handleExercises: (item: ExerciseIdentifier) => void;
    memoizedOnItemPress: (item: ExerciseIdentifier) => void;
    debouncedSearchText: string | null;
    visible: boolean;
    setVisible: (visible: boolean) => void;
  }) => {
    return (
      <>
        <RenderHorizontal selectedExercises={selectedExercises} handleExercises={handleExercises} />
        <View className="mt-[15px] mb-[10px]">
          <Divider text={"Exercises"} />
        </View>
        <RenderExerciseList
          visible={visible}
          setVisible={setVisible}
          debouncedSearchText={debouncedSearchText}
          selectedExercises={selectedExercises}
          onItemPress={memoizedOnItemPress}
          handleExercises={(item) => handleExercises(item)}
        />
      </>
    );
  }
);

const RenderHorizontal = memo(
  ({
    selectedExercises,
    handleExercises,
  }: {
    selectedExercises: ExerciseIdentifier[];
    handleExercises: (item: ExerciseIdentifier) => void;
  }) => {
    return (
      Boolean(selectedExercises.length) && (
        <ExercisesHorizontal
          data={selectedExercises}
          onItemPress={(item) => handleExercises(item)}
        />
      )
    );
  }
);
