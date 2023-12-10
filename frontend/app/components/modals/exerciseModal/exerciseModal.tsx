import { ExerciseInfoContainer } from "components/common/infoContainer";
import Loader from "components/loader/loader";
import ModalWrapper from "components/modals/components/modalWrapper";
import React, { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Exercise, ExerciseIdentifier } from "types/index";
import { InfoItem, Instructions } from "./components";
import { PirmaryButton } from "components/common/primarybutton";

interface ModalProps {
  exercise: Exercise;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  isLoading?: boolean;
  onAdd?: (exercise: ExerciseIdentifier) => void;
  buttonDisabled?: boolean;
}

const ExerciseModal: React.FC<ModalProps> = ({
  visible,
  setVisible,
  exercise,
  isLoading = false,
  onAdd,
  buttonDisabled = false,
}) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleOnScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: p });
    }
  };

  return (
    <ModalWrapper
      handleScrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={300}
      visible={visible}
      setVisible={setVisible}
      title={exercise?.name}
    >
      {isLoading ? (
        <View className="my-[50px]">
          <Loader />
        </View>
      ) : (
        <View className="mt-[20px]">
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
          <Text
            className={`text-white
         text-[19px]
         font-bold capitalize mt-[24px] mb-[17px] ml-[4px]`}
          >
            Instructions:
          </Text>
          <View style={{ maxHeight: 300 }}>
            <ScrollView ref={scrollViewRef} onScroll={handleOnScroll} scrollEventThrottle={16}>
              <TouchableOpacity>
                <Instructions exercise={exercise} />
              </TouchableOpacity>
            </ScrollView>
          </View>
          {onAdd && (
            <PirmaryButton
              text="+ Add"
              extraClassName="my-[20px]"
              onPress={() => onAdd(exercise)}
              disabled={buttonDisabled}
            />
          )}
        </View>
      )}
    </ModalWrapper>
  );
};

export default React.memo(ExerciseModal);
