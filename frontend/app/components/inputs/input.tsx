import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import InputGradient from "./inputGradient";

import Close from "assets/images/close.svg";
import Search from "assets/images/search.svg";
import Book from "assets/images/book.svg";

interface InputProps {
  placeholder?: string;
  defaultValue?: string;
  setValue: (text: string) => void;
  value: string;
  extraClass?: string;
  type?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  defaultValue,
  setValue,
  value,
  extraClass,
  type,
}) => {
  return (
    <View className={extraClass}>
      <InputGradient>
        <View className="flex-row">
          {type === "search" && <Search />}
          {type === "book" && <Book />}
          <TextInput
            id="search-input"
            value={value}
            onChange={(e) => setValue(e.nativeEvent.text)}
            defaultValue={defaultValue}
            aria-hidden={true}
            className={`h-[100%] w-[250px] color-input text-base pr-[13px] ml-[14px] mt-[2px] pt-[2px] `}
            placeholder={placeholder ?? ""}
          />
        </View>
        {Boolean(value?.length) && (
          <TouchableOpacity onPress={() => setValue("")}>
            <Close fill="#A4A4A4" height={20} width={20} />
          </TouchableOpacity>
        )}
      </InputGradient>
    </View>
  );
};
