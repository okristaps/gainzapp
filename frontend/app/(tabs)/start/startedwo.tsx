import { ExerciseInfoContainer } from "components/common/infoContainer";
import DefaultFlatlist from "components/flatlist/defaultFlatlist";
import Header from "components/header";
import Wrapper from "components/layout/wrapper";
import React, { useContext, useState } from "react";
import { StartedWorkoutContext } from "../../contexts/startedWorkout/startedWorkoutContext";

import { StartedWoItem } from "components/flatlist/startedwo/items";
import { ExerciseModalContext } from "../../contexts/exerciseModalContext";
const StartedWorkout: React.FC = () => {
  const { setExercise } = useContext(ExerciseModalContext);
  const { startedWorkout, startedExercise, setStartedExercise, handleProgress, progress } =
    useContext(StartedWorkoutContext);
  const [opened, setOpened] = useState(startedWorkout?.exercises[0]._id);

  const Item = (item: any) => (
    <StartedWoItem
      itemProgress={progress ? progress[item?.item._id] : {}}
      onCardioEndPress={() => handleProgress(item?.item)}
      onInfoPress={() => setExercise(item.item)}
      onPress={() => !startedExercise.length && setOpened(item.item._id)}
      item={item}
      opened={opened === item.item._id}
      startedExercise={startedExercise}
      onStartPress={() => setStartedExercise(item.item._id)}
    />
  );

  return (
    <Wrapper>
      <StartedHeader />
      <DefaultFlatlist
        title="Excercises"
        data={startedWorkout?.exercises}
        isLoading={false}
        renderItem={Item}
      />
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
    </>
  );
};

export default StartedWorkout;
