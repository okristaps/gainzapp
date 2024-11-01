import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import { AuthContext } from "auth/authManager";
import { ExerciseInfoContainer } from "components/common/infoContainer";
import SecondaryTitle from "components/common/secondaryTitle";
import DefaultFlatlist from "components/flatlist/defaultFlatlist";
import { StartedWoItem } from "components/flatlist/startedwo/items/items";
import Header from "components/header";
import Loader from "components/loader/loader";
import ExerciseModal from "components/modals/exerciseModal/exerciseModal";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import { View } from "react-native";
import { Exercise } from "types/index";

export default function ViewPastWorkoutScreen() {
  const [exercise, setExercise] = useState<Exercise | null>(null);

  const { userData } = useContext(AuthContext);
  const params = useLocalSearchParams<{ workoutId: string; justFinished: string }>();

  const { isLoading, data } = useQuery({
    retry: false,
    queryKey: ["workouts", params],
    queryFn: async () =>
      await getBe({
        path: `/completed/${userData?.uid}`,
        params: { id: params.workoutId },
      }),
  });

  const [opened, setOpened] = useState(data?.exercises[0]._id);

  const finishedCount = data?.workout?.progress
    ? Object?.values(data?.workout?.progress)
        .map((i) => i?.finished)
        .filter((e) => e === true)
    : [];

  const Item = useCallback(
    (item: any) => {
      const progress = data?.workout?.progress[item?.item._id];
      return (
        <StartedWoItem
          displayAsFinished={progress?.finsihed}
          itemProgress={progress}
          onPress={() => progress?.finished && setOpened(item.item._id)}
          item={item}
          onInfoPress={() => setExercise(item.item)}
          opened={opened === item.item._id}
        />
      );
    },
    [opened, data?.workout?.progress]
  );

  const handleReset = () => {
    router.replace({ pathname: "logs" });
    router.replace({ pathname: "(tabs)" });
  };

  return (
    <View className="flex flex-1">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            extraClassname="h-[50px]"
            title={data?.workout?.name}
            iconLeft={{
              text: params.justFinished ? "Close" : "Back",
              hideText: !params.justFinished,
              onPress: () => (params.justFinished ? handleReset() : router.back()),
            }}
          />

          <View className="mb-[10px]">
            <SecondaryTitle text={"12.12.2022"} />
          </View>

          <ExerciseInfoContainer
            info1={{
              title: "Time spent",
              sub: data.workout?.duration,
            }}
            info2={{
              title: "Completed",
              sub: finishedCount.length + " / " + data?.exercises?.length,
            }}
          />

          <DefaultFlatlist
            title="Excercises"
            data={data?.exercises}
            isLoading={false}
            renderItem={Item}
            extraData={data?.workout?.progress}
          />
        </>
      )}
      {exercise !== null && (
        <ExerciseModal
          visible={Boolean(exercise)}
          setVisible={() => setExercise(null)}
          exercise={exercise}
        />
      )}
    </View>
  );
}
