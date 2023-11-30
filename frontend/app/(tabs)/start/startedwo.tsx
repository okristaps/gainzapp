import DefaultFlatlist from "components/flatlist/defaultFlatlist";
import Wrapper from "components/layout/wrapper";
import React, { useContext, useState } from "react";
import { StartedWorkoutContext } from "../../contexts/startedWorkout/startedWorkoutContext";

import { PirmaryButtonEmpty } from "components/common/primarybutton";
import StartedHeader from "components/flatlist/startedwo/header";
import { calculateCompletedPercentage } from "components/flatlist/startedwo/helpers";
import { StartedWoItem } from "components/flatlist/startedwo/items";
import CardioModal from "components/modals/inputModal/cardioInputModal";
import { View } from "react-native";
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
      onEndPress={(sets: any) => handleProgress(item.item, sets)}
    />
  );

  const completedPercentage = calculateCompletedPercentage(progress);

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
      <View className="mt-[20px]">
        <PirmaryButtonEmpty
          text="End workout"
          extraClassName={`${completedPercentage !== 100 && "border-danger"}`}
          extraTextClassName={`${completedPercentage !== 100 && "text-danger"}`}
        />
      </View>

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
