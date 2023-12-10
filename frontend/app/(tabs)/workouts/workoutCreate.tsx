import Info from "assets/images/info.svg";
import { PirmaryButtonEmpty } from "components/common/primarybutton";
import { EmptyComponent, RenderItem } from "components/flatlist/components";
import Header from "components/header";
import { Input } from "components/inputs/input";
import Wrapper from "components/layout/wrapper";
import { router, useNavigation } from "expo-router";
import React, { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { WorkoutsContext } from "../../contexts/workoutsContext";

import { AnimatedFlashList } from "@shopify/flash-list";
import Bin from "assets/images/trash.svg";
import { Divider } from "components/loginform/components";

import ExerciseModal from "components/modals/exerciseModal/exerciseModal";
import { Exercise } from "types/index";
import { compareExercises } from "../../helpers";
import { handleDelete, handleSave, initialLoading } from "./helpers";

export default function TabWorkoutsCreate() {
  const { selectedExercises, handleExercises, selectedWorkout, createWorkout, deleteWorkout } =
    useContext(WorkoutsContext);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const navigation = useNavigation();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(initialLoading);

  const defaultDisabled = name.length === 0 || selectedExercises.length === 0;

  const disabledEdit =
    (selectedWorkout?.name == name &&
      compareExercises(selectedExercises, selectedWorkout?.exercises)) ||
    defaultDisabled;

  const Item = React.useCallback(
    ({
      item,
    }: {
      item: {
        _id: string;
        name: string;
      };
    }) => {
      return (
        <View className={`flex flex-1 flex-row items-center`}>
          <TouchableOpacity className="mr-[9px]" onPress={() => handleExercises(item)}>
            <Bin height={24} width={24} />
          </TouchableOpacity>
          <View className="flex-1">
            <RenderItem
              item={item}
              customIconRight={<Info />}
              onPress={() =>
                setExercise(selectedWorkout?.exercises?.find((exer) => exer._id === item._id))
              }
            />
          </View>
        </View>
      );
    },
    []
  );

  return (
    <Wrapper>
      <Header
        title={selectedWorkout ? "Edit" : "Create Workout"}
        iconLeft={{
          text: "Cancel",
          color: "danger",
          hideText: false,
          onPress: () => router.back(),
        }}
        iconRight={{
          disabled:
            loading.delete || loading.post || selectedWorkout?._id ? disabledEdit : defaultDisabled,
          text: "Save",
          color: "success",
          hideText: false,
          onPress: () =>
            handleSave({
              setLoading: () => setLoading,
              createWorkout,
              name,
              _id: selectedWorkout?._id,
              navigation,
            }),
        }}
      />

      <Input
        placeholder="Enter workout name..."
        onValueChange={setName}
        type="book"
        initialValue={selectedWorkout?.name ?? ""}
      />
      <Divider text={"Exercises"} textSize={28} extraClassName="mt-[25px] mb-[15px]" />

      <View className="mt-[10px] flex flex-1">
        <AnimatedFlashList
          ListEmptyComponent={<EmptyComponent isLoading={false} text={"No exercises added yet"} />}
          data={selectedExercises}
          ItemSeparatorComponent={() => <View className="h-[10px]" />}
          estimatedItemSize={40}
          renderItem={Item}
        />
      </View>

      <View className="mt-[10px]">
        <PirmaryButtonEmpty
          disabled={loading.delete || loading.post}
          text="+ Add exercises"
          onPress={() => {
            router.push({
              pathname: "workouts/exercisesSelect",
            });
          }}
        />
        {selectedWorkout?._id && (
          <View className="mt-[10px]">
            <PirmaryButtonEmpty
              disabled={loading.delete || loading.post}
              loading={loading.delete}
              color="danger"
              text="Delete workout"
              onPress={() =>
                handleDelete({
                  setLoading: () => setLoading,
                  deleteWorkout,
                })
              }
            />
          </View>
        )}
      </View>
      {exercise !== null && (
        <ExerciseModal
          visible={Boolean(exercise)}
          setVisible={() => setExercise(null)}
          exercise={exercise}
        />
      )}
    </Wrapper>
  );
}
