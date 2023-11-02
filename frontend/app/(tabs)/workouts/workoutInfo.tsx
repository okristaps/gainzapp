import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import SecondaryTitle from "components/common/secondaryTitle";
import { DefaultFlatlist } from "components/flatlist";
import { RenderItem } from "components/flatlist/components";
import Header from "components/header";
import Wrapper from "components/layout/wrapper";
import { router } from "expo-router";
import React, { useContext, useEffect } from "react";

import Info from "assets/images/info.svg";
import { InfoContainer } from "components/common/infoContainer";
import { Exercise } from "../../../types";
import { ExerciseModalContext } from "../../contexts/exerciseModalContext";
import { WorkoutsContext } from "./context/workoutsContext";

export default function TabWorkoutInfo() {
  const { setExercise } = useContext(ExerciseModalContext);
  const { setSelectedExercises, selectedWorkout } = useContext(WorkoutsContext);

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
    <Wrapper>
      <Header
        title="Workout info"
        iconLeft={{
          text: "Back",
          hideText: true,
          onPress: () => router.back(),
        }}
        iconRight={{ text: data?.uid ? "Edit" : "", onPress: () => handleExercises() }}
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
    </Wrapper>
  );
}
