import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { PirmaryButton } from "components/common/primarybutton";
import InputGradient from "components/inputs/inputGradient";
import ModalWrapper from "components/modals/components/modalWrapper";
import moment from "moment";
import { useCallback, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const DateTimePickerComponent = ({
  date,
  setDate,
  title = "Date",
}: {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  title?: string;
}) => {
  const dateRef = useRef(new Date(1598051730000));
  const [visible, setVisible] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    dateRef.current = currentDate;
  };

  const onSave = useCallback(() => {
    setDate(dateRef.current);
    setVisible(false);
  }, [dateRef]);

  return (
    <View className="mt-[10px]">
      <Text className="color-input text-base mb-[5px]"> {title} </Text>
      <InputGradient>
        <TouchableOpacity
          className="flex flex-1"
          onPress={() => {
            setVisible(true);
          }}
        >
          <Text className="color-input">
            {date ? moment(date).format("DD-MM-YYYY") : "Select Date"}
          </Text>
        </TouchableOpacity>
        <ModalWrapper visible={visible} setVisible={setVisible} title={"Select Date"}>
          <DateTimePicker
            style={{
              display: "flex",
              width: "100%",
            }}
            placeholderText="Select birth date"
            display="spinner"
            testID="dateTimePicker"
            value={date ?? new Date()}
            mode={"date"}
            is24Hour={true}
            minimumDate={new Date(1950, 0, 1)}
            maximumDate={new Date(2020, 10, 20)}
            onChange={onChange}
          />
          <PirmaryButton text="Save" onPress={onSave} />
        </ModalWrapper>
      </InputGradient>
    </View>
  );
};
