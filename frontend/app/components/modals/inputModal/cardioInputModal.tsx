import ModalWrapper from "components/modals/components/modalWrapper";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

import { PirmaryButtonEmpty } from "components/common/primarybutton";

import { Input } from "components/inputs/input";
import useTimeInput from "../../../hooks/timeFormatHook";

interface CardioModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSave: (payload: any) => void;
  payload: any;
}

const CardioModal: React.FC<CardioModalProps> = ({ visible, setVisible, onSave, payload }) => {
  const { timeValue, setTimeValue, formatTime, isValidTime } = useTimeInput();
  const [distance, setDistance] = useState("");

  const distanceInputRef = useRef<any>(null);
  useEffect(() => {
    setTimeValue(payload?.time ?? "");
    if (visible) {
      distanceInputRef.current?.focus();
    }
  }, [visible, payload]);

  return (
    <ModalWrapper visible={visible} setVisible={setVisible} title={payload?.item?.name}>
      <View className="flex flex-row m-w-[100%] mt-[20px]">
        <View className="flex-1 ">
          <Text className="text-secondary mb-[5px] "> Time </Text>
          <Input
            keyboardType={"numeric"}
            type="time"
            placeholder="HH:MM:SS"
            value={timeValue}
            setValue={setTimeValue}
            onChangeText={formatTime}
            extraInputClass="w-[80px]"
          />
        </View>
        <View className="w-[5%]" />
        <View className="flex-1">
          <Text className="text-secondary mb-[5px] "> Distance </Text>
          <Input
            keyboardType={"numeric"}
            ref={distanceInputRef}
            placeholder="0000m"
            value={distance.toString()}
            setValue={(value) => setDistance(value)}
            type="search"
            extraInputClass="w-[70px]"
          />
        </View>
      </View>
      <View className="mt-[20px]">
        <PirmaryButtonEmpty
          text="Save"
          disabled={!isValidTime || !distance.length}
          onPress={() =>
            onSave({ payload: { time: timeValue, distance: distance }, item: payload.item })
          }
        />
      </View>
    </ModalWrapper>
  );
};

export default CardioModal;
