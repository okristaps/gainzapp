import DefaultFlatlist from "components/flatlist/defaultFlatlist";
import Wrapper from "components/layout/wrapper";
import React, { useContext, useState } from "react";
import { StartedWorkoutContext } from "../../contexts/startedWorkout/startedWorkoutContext";

import StartedHeader from "components/flatlist/startedwo/header";
import { StartedWoItem } from "components/flatlist/startedwo/items";
import { ExerciseModalContext } from "../../contexts/exerciseModalContext";
const StartedWorkout: React.FC = () => {
  const { setExercise } = useContext(ExerciseModalContext);
  const {
    startedWorkout,
    startedExercise,
    startExercise,
    handleProgress,
    progress,
    startTime,
    setStartTime,
  } = useContext(StartedWorkoutContext);
  const [opened, setOpened] = useState(startedWorkout?.exercises[0]._id);
  const [finished, setFinished] = useState(false);

  const Item = (item: any) => (
    <StartedWoItem
      itemProgress={progress ? progress[item?.item._id] : {}}
      onCardioEndPress={(payload: any) => handleProgress(item?.item, payload)}
      onInfoPress={() => setExercise(item.item)}
      onPress={() => !startedExercise.length && setOpened(item.item._id)}
      item={item}
      opened={opened === item.item._id}
      startedExercise={startedExercise}
      onStartPress={() => startExercise(item.item._id)}
    />
  );

  return (
    <Wrapper>
      <StartedHeader
        progress={progress}
        finished={finished}
        startTime={startTime}
        setStartTime={setStartTime}
      />
      <DefaultFlatlist
        title="Excercises"
        data={startedWorkout?.exercises}
        isLoading={false}
        renderItem={Item}
        extraData={progress}
      />
    </Wrapper>
  );
};

export default StartedWorkout;
