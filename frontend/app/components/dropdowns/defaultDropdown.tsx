import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import InputGradient from "components/inputs/inputGradient";
import colors from "constants/colors";
import { DropDownData } from "types/components";
import { DropdownItem } from "./components/item";

interface DropdownComponentProps {
  data?: DropDownData[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const mockData = [
  { label: "Male", value: "male", _index: 1 },
  { label: "Female", value: "female", _index: 2 },
];

const DefaultDropdown: React.FC<DropdownComponentProps> = ({
  data = mockData,
  value,
  setValue,
}) => {
  return (
    <View className="flex flex-row items-center">
      <View className="flex flex-1">
        <InputGradient>
          <Dropdown
            mode="modal"
            renderItem={(item: DropDownData) => <DropdownItem data={data} item={item} />}
            style={[styles.dropdown]}
            selectedTextStyle={[styles.selectedTextStyle]}
            containerStyle={styles.container}
            data={data}
            labelField="label"
            valueField="value"
            value={value}
            onChange={(item) => setValue(item?.value)}
            autoScroll={false}
          />
        </InputGradient>
      </View>
    </View>
  );
};

export default DefaultDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    borderColor: colors.secondary,
    borderRadius: 15,
    padding: 10,
    maxHeight: 300,
  },
  dropdown: {
    flex: 1,
    zIndex: 10,
    textTransform: "capitalize",
  },
  icon: {
    marginRight: 10,
    color: colors.success,
  },
  placeholderStyle: {
    fontSize: 15,
    textTransform: "capitalize",
    color: colors.input,
  },
  selectedTextStyle: {
    fontSize: 15,
    color: colors.input,
    textTransform: "capitalize",
  },
});
