import DefaultFlatlist from "components/flatlist/defaultFlatlist";
import Wrapper from "components/layout/wrapper";
import React, { useContext, useState } from "react";
import { StartedWorkoutContext } from "../../contexts/startedWorkout/startedWorkoutContext";

import StartedHeader from "components/flatlist/startedwo/header";
import { StartedWoItem } from "components/flatlist/startedwo/items";
import { ExerciseModalContext } from "../../contexts/exerciseModalContext";
import CardioModal from "components/modals/inputModal/cardioInputModal";
import OtherInputModal from "components/modals/inputModal/otherInputModal";
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

  const initial = {
    key: "",
    payload: null,
  };

  const [opened, setOpened] = useState(startedWorkout?.exercises[0]._id);
  const [finished, setFinished] = useState(false);
  const [modal, setModal] = useState(initial);

  const Item = (item: any) => (
    <StartedWoItem
      itemProgress={progress ? progress[item?.item._id] : {}}
      onCardioEndPress={(payload: any) => {
        setModal({
          key: "Cardio",
          payload: { ...payload, item: item?.item },
        });
      }}
      onInfoPress={() => setExercise(item.item)}
      onPress={() => !startedExercise.length && setOpened(item.item._id)}
      item={item}
      opened={opened === item.item._id}
      startedExercise={startedExercise}
      onStartPress={() => startExercise(item.item._id)}
      onStartSetPress={() => {
        setModal({
          key: "Other",
          payload: { item: item?.item },
        });
      }}
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

      {modal.key === "Other" && (
        <OtherInputModal visible={true} setVisible={() => setModal(initial)} />
      )}

      {modal.key === "Cardio" && (
        <CardioModal
          visible={true}
          setVisible={() => setModal(initial)}
          payload={modal.payload}
          onSave={(data) => {
            handleProgress(data.item, data.payload);
            setModal(initial);
          }}
        />
      )}
    </Wrapper>
  );
};

export default StartedWorkout;
