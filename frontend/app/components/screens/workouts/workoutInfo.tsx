import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import SecondaryTitle from "components/common/secondaryTitle";
import { DefaultFlatlist } from "components/flatlist";
import { RenderItem } from "components/flatlist/components";
import Header from "components/header";
import { router, usePathname } from "expo-router";
import React, { useContext, useEffect, useState } from "react";

import Info from "assets/images/info.svg";
import { InfoContainer } from "components/common/infoContainer";
import { PirmaryButton } from "components/common/primarybutton";
import ExerciseModal from "components/modals/exerciseModal/exerciseModal";
import { View } from "react-native";
import { Exercise } from "types/index";
import { StartedWorkoutContext } from "../../../contexts/startedWorkout/startedWorkoutContext";
import { WorkoutsContext } from "../../../contexts/workoutsContext";

interface InfoProps {
  path?: string;
}

const TabWorkoutInfo: React.FC<InfoProps> = ({ path = "workouts" }) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const { setStartedWorkout } = useContext(StartedWorkoutContext);
  const { setSelectedExercises, selectedWorkout } = useContext(WorkoutsContext);
  const test = usePathname();
  console.log("path", test);

  const { isLoading, data, refetch } = useQuery({
    retry: 3,
    queryKey: ["workout", selectedWorkout?._id],
    queryFn: async () =>
      await getBe({
        path: `/workouts/${selectedWorkout?._id}`,
      }),
  });

  const handleExercises = () => {
    setSelectedExercises(data?.exercises.map((ex: Exercise) => ({ _id: ex._id, name: ex.name })));
    router.push({ pathname: "workouts/workoutCreate" });
  };

  useEffect(() => {
    refetch();
  }, [selectedWorkout]);

  return (
    <View className="flex flex-1">
      <Header
        title={path === "workouts" ? "Workout info" : "Start"}
        iconLeft={{
          text: "Back",
          hideText: true,
          onPress: () => router.back(),
        }}
        iconRight={
          path === "workouts"
            ? {
                text: data?.uid ? "Edit" : "",
                onPress: () => handleExercises(),
              }
            : undefined
        }
      />
      <SecondaryTitle text={data?.name} />
      <InfoContainer forces={data?.forces} equipment={data?.equipment} />
      <DefaultFlatlist
        title="Excercises"
        data={data?.exercises}
        isLoading={isLoading}
        renderItem={(item) => (
          <RenderItem
            item={item.item}
            customIconRight={<Info />}
            onPress={() => setExercise(item.item)}
          />
        )}
      />
      {exercise !== null && (
        <ExerciseModal
          visible={Boolean(exercise)}
          setVisible={() => setExercise(null)}
          exercise={exercise}
        />
      )}
      {path === "start" && (
        <View className="mt-[10px]">
          <PirmaryButton
            text="Start"
            onPress={() => {
              setStartedWorkout(selectedWorkout);
              router.push({ pathname: "start/startedwo" });
            }}
          />
        </View>
      )}
    </View>
  );
};

export default TabWorkoutInfo;
