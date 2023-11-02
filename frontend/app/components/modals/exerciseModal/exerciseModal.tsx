import { ExerciseInfoContainer } from "components/common/infoContainer";
import ModalWrapper from "components/modals/components/modalWrapper";
import React from "react";
import { View } from "react-native";
import { Exercise } from "types/index";
import { InfoItem, Instructions } from "./components";
import Loader from "components/loader/loader";

interface ModalProps {
  exercise: Exercise | null;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  isLoading?: boolean;
}

const ExerciseModal: React.FC<ModalProps> = ({
  visible,
  setVisible,
  exercise,
  isLoading = false,
}) => {
  console.log("modal");
  return (
    <ModalWrapper visible={visible} setVisible={setVisible} title={exercise?.name}>
      {isLoading ? (
        <View className="my-[50px]">
          <Loader />
        </View>
      ) : (
        <>
          <ExerciseInfoContainer
            info1={{
              title: "Category",
              sub: exercise?.category,
            }}
            info2={{
              title: "Mechanic",
              sub: exercise?.mechanic,
            }}
          />
          <View className="mt-[32px]">
            <InfoItem text="level" items={[exercise?.level ?? ""]} />
            <InfoItem text="Force" items={[exercise?.force ?? ""]} />
            <InfoItem text="Equipment" items={[exercise?.equipment ?? ""]} />
            <InfoItem text="Primary muscles" items={exercise?.primaryMuscles ?? [""]} />
            {Boolean(exercise?.secondaryMuscles?.length) && (
              <InfoItem text="Secondary muscles" items={exercise?.secondaryMuscles ?? [""]} />
            )}
          </View>
          <Instructions exercise={exercise} />
        </>
      )}
    </ModalWrapper>
  );
};

export default React.memo(ExerciseModal);
