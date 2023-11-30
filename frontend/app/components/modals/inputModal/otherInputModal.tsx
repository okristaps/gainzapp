import ModalWrapper from "components/modals/components/modalWrapper";
import React, { useState } from "react";
import { Text, View } from "react-native";

import { PirmaryButtonEmpty } from "components/common/primarybutton";
import { Input } from "components/inputs/input";

interface OtherModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSave: (payload: any) => void;
  payload: any;
}

const OtherInputModal: React.FC<OtherModalProps> = ({ visible, setVisible, onSave, payload }) => {
  const [value, setValue] = useState("");

  return (
    <ModalWrapper visible={visible} setVisible={setVisible} title={payload?.item?.name}>
      <View className="flex flex-row m-w-[100%] mt-[20px]">
        <View className="flex-1 ">
          <Text className="text-secondary mb-[5px] "> Weight Kg's </Text>
          <Input
            keyboardType={"numeric"}
            type="search"
            placeholder="12kg"
            value={value}
            setValue={setValue}
            extraInputClass="w-[80px]"
          />
        </View>
        <View className="w-[5%]" />
        <View className="flex-1">
          <Text className="text-secondary mb-[5px] "> Reps x </Text>
          <Input
            keyboardType={"numeric"}
            placeholder="12"
            value={value}
            setValue={(value) => setValue(value)}
            type="search"
            extraInputClass="w-[70px]"
          />
        </View>
      </View>
      <View className="mt-[20px]">
        <PirmaryButtonEmpty
          text="Save"
          //   disabled={!isValidTime || !distance.length}
          //   onPress={() =>
          //     onSave({ payload: { time: timeValue, distance: distance }, item: payload.item })
          //   }
        />
      </View>
    </ModalWrapper>
  );
};

export default OtherInputModal;
