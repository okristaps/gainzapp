import { EmptyComponent, RenderItem } from "components/flatlist/components";
import Header from "components/header";
import Wrapper from "components/layout/wrapper";
import { router } from "expo-router";
import React, { useContext, useState } from "react";

import Info from "assets/images/info.svg";
import { PirmaryButtonEmpty } from "components/common/primarybutton";
import { Input } from "components/inputs/input";
import { Alert, TouchableOpacity, View } from "react-native";
import { WorkoutsContext } from "./context/workoutsContext";

import { FlashList } from "@shopify/flash-list";
import Bin from "assets/images/trash.svg";
import { Divider } from "components/loginform/components";
import { compareExercises } from "../../helpers";

const initialLoading = {
  post: false,
  delete: false,
};

export default function TabWorkoutsCreate() {
  const {
    selectedExercises,
    handleExercises,
    selectedWorkout,
    createWorkout,
    name,
    setName,
    deleteWorkout,
  } = useContext(WorkoutsContext);

  const [loading, setLoading] = useState(initialLoading);

  const disabledEdit =
    (selectedWorkout?.name == name &&
      compareExercises(selectedExercises, selectedWorkout?.exercises)) ||
    name.length === 0;

  const handleSave = async () => {
    setLoading({ ...initialLoading, post: true });
    createWorkout(selectedWorkout?._id)
      .then(() => router.replace({ pathname: "workouts" }))
      .catch(() => {
        showAlert("Error", "An error occurred while saving your workout.");
      })
      .finally(() => {
        setLoading(initialLoading);
      });
  };

  const handleDelete = () =>
    Alert.alert("Do you want to delete this workout?", "All changes will be lost", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setLoading({ ...initialLoading, delete: true });
          deleteWorkout()
            .then(() => router.replace({ pathname: "workouts" }))
            .catch(() => {
              showAlert("Error", "An error occurred while deleting the workout.");
            })
            .finally(() => {
              setLoading(initialLoading);
            });
        },
      },
    ]);

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: "OK", onPress: () => {} }]);
  };

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
            <RenderItem item={item} customIconRight={<Info />} />
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
            loading.delete || loading.post || selectedWorkout?._id
              ? disabledEdit
              : !name.length || !selectedExercises.length,
          text: "Save",
          color: "success",
          hideText: false,
          onPress: () => handleSave(),
        }}
      />

      <Input
        placeholder="Enter workout name..."
        value={name}
        setValue={(text: string) => setName(text)}
        type="book"
      />
      <Divider text={"Exercises"} textSize={28} extraClassName="mt-[25px]" />

      <View className="mt-[10px] flex flex-1">
        <FlashList
          ListEmptyComponent={<EmptyComponent isLoading={false} text={"No exercises found yet"} />}
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
        <View className="mt-[10px]">
          <PirmaryButtonEmpty
            disabled={loading.delete || loading.post}
            loading={loading.delete}
            color="danger"
            text="Delete workout"
            onPress={handleDelete}
          />
        </View>
      </View>
    </Wrapper>
  );
}
