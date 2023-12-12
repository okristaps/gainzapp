import DefaultFlatlist from "components/flatlist/defaultFlatlist";
import Wrapper from "components/layout/wrapper";
import React, { useCallback, useContext, useState } from "react";
import { StartedWorkoutContext } from "../../contexts/startedWorkout/startedWorkoutContext";

import { PirmaryButtonEmpty } from "components/common/primarybutton";
import StartedHeader from "components/flatlist/startedwo/header";
import { calculateCompletedPercentage } from "components/flatlist/startedwo/helpers";
import { StartedWoItem } from "components/flatlist/startedwo/items/items";
import ExerciseModal from "components/modals/exerciseModal/exerciseModal";
import CardioModal from "components/modals/inputModal/cardioInputModal";
import { Alert, View } from "react-native";
import { Exercise } from "types/index";
import { router } from "expo-router";

const StartedWorkout: React.FC = () => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const {
    startedWorkout,
    startedExercise,
    startExercise,
    handleProgress,
    progress,
    startTime,
    setStartTime,
    loading,
    completeWorkout,
    setProgress,
  } = useContext(StartedWorkoutContext);

  const initial = {
    key: "",
    payload: null,
  };

  const [opened, setOpened] = useState(startedWorkout?.exercises[0]._id);
  const [finished, setFinished] = useState(false);
  const [modal, setModal] = useState(initial);

  const Item = useCallback(
    (item: any) => {
      return (
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
    },
    [
      opened,
      progress,
      setExercise,
      setOpened,
      startExercise,
      startedExercise,
      handleProgress,
      setModal,
    ]
  );

  const completedPercentage = calculateCompletedPercentage(progress);

  const endWo = () =>
    completedPercentage !== 100
      ? Alert.alert("Do you want to end the workout?", "All exercises aren't completed yet", [
          {
            text: "Cancel",

            style: "cancel",
          },
          { text: "OK", onPress: () => completeWorkout() },
        ])
      : completeWorkout();

  const cancelWo = () =>
    Alert.alert("Do you want to cancel the workout?", "All progress will be lost", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          router.replace("start");
          setProgress({});
        },
      },
    ]);

  return (
    <Wrapper>
      <StartedHeader
        onCancel={cancelWo}
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

      {completedPercentage > 0 && (
        <View className="mt-[20px]">
          <PirmaryButtonEmpty
            loading={loading}
            text="End workout"
            onPress={endWo}
            extraClassName={`${completedPercentage !== 100 && "border-danger"}`}
            extraTextClassName={`${completedPercentage !== 100 && "text-danger"}`}
          />
        </View>
      )}

      {exercise !== null && (
        <ExerciseModal
          visible={Boolean(exercise)}
          setVisible={() => setExercise(null)}
          exercise={exercise}
        />
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
