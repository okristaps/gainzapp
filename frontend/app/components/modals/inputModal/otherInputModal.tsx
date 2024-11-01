import ModalWrapper from "components/modals/components/modalWrapper";
import React, { useState } from "react";
import { Text, View } from "react-native";

import { PirmaryButtonEmpty } from "components/common/primarybutton";
import { Input } from "components/inputs/input";
import { Categories, reppedWithoutWeightCategories } from "types/filters";

interface OtherModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSave: (payload: any) => void;
  payload: any;

  withoutWeight: boolean;
}

const OtherInputModal: React.FC<OtherModalProps> = ({
  visible,
  setVisible,
  onSave,
  payload,

  withoutWeight,
}) => {
  const [value, setValue] = useState(payload.weight ?? "");
  const [reps, setReps] = useState(payload.reps ?? "");

  return (
    <ModalWrapper visible={visible} setVisible={setVisible} title={"Set " + (payload.index + 1)}>
      <View className="flex flex-row m-w-[100%] mt-[20px]">
        {!withoutWeight && (
          <View className="flex-1 ">
            <Text className="text-secondary mb-[5px] "> Weight Kg's </Text>
            <Input
              keyboardType={"numeric"}
              type="search"
              placeholder="12kg"
              maxLength={3}
              onValueChange={setValue}
              extraInputClass="w-[80px]"
            />
          </View>
        )}
        {!withoutWeight && <View className="w-[5%]" />}
        <View className="flex-1">
          <Text className="text-secondary mb-[5px] "> Reps x </Text>
          <Input
            maxLength={3}
            keyboardType={"numeric"}
            placeholder="12"
            onValueChange={(value) => setReps(value)}
            type="search"
            extraInputClass="w-[70px]"
          />
        </View>
      </View>
      <View className="mt-[20px]">
        <PirmaryButtonEmpty
          disabled={withoutWeight ? !reps.length : !value.length || !reps.length}
          text="Save"
          onPress={() => onSave({ weight: value, reps: reps, index: payload.index })}
        />
      </View>
    </ModalWrapper>
  );
};

export default OtherInputModal;
