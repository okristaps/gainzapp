import React, { forwardRef } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import InputGradient from "./inputGradient";

import Book from "assets/images/book.svg";
import Close from "assets/images/close.svg";
import Search from "assets/images/search.svg";
import StopWatch from "assets/images/stopwatch.svg";
import colors from "constants/colors";

interface InputProps {
  placeholder?: string;
  defaultValue?: string;
  setValue: (text: string) => void;
  value: string;
  extraClass?: string;
  type?: string;
  keyboardType?: any;
  onChangeText?: (text: string) => void;
  extraInputClass?: string;
}

export const Input: React.FC<InputProps> = forwardRef(
  (
    {
      placeholder,
      defaultValue,
      setValue,
      value,
      extraClass,
      type,
      keyboardType,
      onChangeText,
      extraInputClass,
    },
    ref
  ) => {
    return (
      <View className={`flex  ${extraClass}`}>
        <InputGradient extraClassName="flex items-center">
          <View className="flex-row">
            {type === "search" && <Search height={20} width={20} />}
            {type === "book" && <Book />}
            {type === "time" && <StopWatch height={20} width={20} stroke={colors.primary} />}
            <TextInput
              ref={ref}
              keyboardType={keyboardType}
              id="input"
              value={value}
              onChangeText={(text) => (onChangeText ? onChangeText(text) : setValue(text))}
              defaultValue={defaultValue}
              aria-hidden={true}
              className={`h-[100%] w-[250px] color-input text-base pr-[13px]  ml-[14px] mt-[2px] pt-[2px] 
              ${extraInputClass}
              `}
              placeholder={placeholder ?? ""}
            />
          </View>
          {Boolean(value?.length) && (
            <TouchableOpacity className="" onPress={() => setValue("")}>
              <Close fill="#A4A4A4" height={20} width={20} />
            </TouchableOpacity>
          )}
        </InputGradient>
      </View>
    );
  }
);
