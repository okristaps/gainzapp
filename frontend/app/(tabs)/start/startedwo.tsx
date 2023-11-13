import { ExerciseInfoContainer } from "components/common/infoContainer";
import Header from "components/header";
import Wrapper from "components/layout/wrapper";
import { Divider } from "components/loginform/components";
import React from "react";
import { View } from "react-native";

interface StartedWorkout {
  path?: string;
}

const StartedWorkout: React.FC<StartedWorkout> = ({ path = "workouts" }) => {
  return (
    <Wrapper>
      <StartedHeader />
    </Wrapper>
  );
};

const StartedHeader = () => {
  return (
    <>
      <Header title={"Selected workout"} />
      <ExerciseInfoContainer
        info1={{
          title: "Time spent",
          sub: "21min 23sec",
        }}
        info2={{
          title: "Completed",
          sub: "23%",
        }}
      />
      <View className="mt-[20px]">
        <Divider text="Exercises" />
      </View>
    </>
  );
};

export default StartedWorkout;
