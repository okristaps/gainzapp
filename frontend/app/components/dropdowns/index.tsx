import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import InputGradient from "components/inputs/inputGradient";
import colors from "constants/colors";
import { DropDownData } from "types/components";

import Close from "assets/images/close.svg";

interface DropdownComponentProps {
  title?: string;
  renderLeftIcon?: () => React.ReactElement;
  data: DropDownData[];
  clearDisabled?: boolean;
  value: string | null;
  setValue: (value: string | null) => void;
  isFocus: boolean;
  setIsFocus: (value: boolean) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  title = "Categorie",
  data,
  renderLeftIcon = undefined,
  clearDisabled = false,
  value,
  setValue,
  isFocus,
  setIsFocus,
}) => {
  const Item = (item: { label: string; _index: number }): React.JSX.Element | null => {
    return (
      <View
        key={item.label}
        className={`
              h-[45px] 
              justify-center 
              pl-[10px] 
              border-0
              bg-[#1E1E1E]
              ${item._index !== data.length - 1 && "border-b-[0.5px]"}
              border-secondary
            `}
      >
        <Text className={`text-primary text-16 capitalize`}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View className="flex flex-row items-center">
      <Text className="text-secondary text-15 text-center w-[100px]  "> {title} </Text>
      <View className="flex flex-1">
        <InputGradient>
          <Dropdown
            renderLeftIcon={renderLeftIcon}
            renderItem={Item}
            mode="modal"
            style={[styles.dropdown, isFocus && { borderColor: colors.secondary }]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              isFocus && { textTransform: "capitalize" },
            ]}
            placeholderStyle={[
              styles.placeholderStyle && isFocus && { textTransform: "capitalize" },
              { color: isFocus ? colors.info : colors.secondary },
            ]}
            containerStyle={styles.container}
            data={data}
            labelField="label"
            valueField="value"
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
            autoScroll={false}
          />
          {value && !clearDisabled && (
            <TouchableOpacity className="ml-[3px]" onPress={() => setValue(null)}>
              <Close fill={colors.secondary} height={20} width={20} />
            </TouchableOpacity>
          )}
        </InputGradient>
      </View>
    </View>
  );
};

export default DropdownComponent;

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
    color: colors.success,
    textTransform: "capitalize",
    borderColor: colors.success,
  },
});
