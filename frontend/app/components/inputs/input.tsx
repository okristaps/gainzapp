import React, { forwardRef, useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import InputGradient from "./inputGradient";

import Book from "assets/images/book.svg";
import Close from "assets/images/close.svg";
import Search from "assets/images/search.svg";
import StopWatch from "assets/images/stopwatch.svg";
import useDebounce from "components/flatlist/helpers/searchDebounce";
import colors from "constants/colors";

interface InputProps {
  placeholder?: string;
  defaultValue?: string;
  extraClass?: string;
  type?: string;
  keyboardType?: any;
  onChangeText?: (text: string) => void;
  extraInputClass?: string;
  onValueChange?: (text: string) => void;
  debounceEnabled?: boolean;
  customValue?: string;
  initialValue?: string;
  maxLength?: number;
  editable?: boolean;
}

export const Input: React.FC<InputProps> = forwardRef(
  (
    {
      customValue,
      placeholder,
      defaultValue,
      extraClass,
      type,
      keyboardType,
      onChangeText,
      extraInputClass,
      onValueChange,
      debounceEnabled,
      initialValue,
      maxLength,
      editable = true,
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(initialValue ?? "");
    const debouncedSearchText = useDebounce(value, 300);

    useEffect(() => {
      if (debounceEnabled) onValueChange?.(debouncedSearchText ?? "");
      else onValueChange?.(value ?? "");
    }, [debouncedSearchText, onValueChange]);

    return (
      <View className={`flex  ${extraClass}`}>
        <InputGradient extraClassName="flex items-center">
          <View className="flex-row">
            {type && (
              <View className="mr-[14px]">
                {type === "search" && <Search height={20} width={20} />}
                {type === "book" && <Book />}
                {type === "time" && <StopWatch height={20} width={20} stroke={colors.primary} />}
              </View>
            )}
            <TextInput
              editable={editable}
              maxLength={maxLength}
              ref={ref}
              keyboardType={keyboardType}
              id="input"
              value={customValue ?? value}
              onChangeText={(text) => (onChangeText ? onChangeText(text) : setValue(text))}
              defaultValue={defaultValue}
              aria-hidden={true}
              className={`h-[100%] w-[250px] color-input text-base pr-[13px]   mt-[2px] pt-[2px] 
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
