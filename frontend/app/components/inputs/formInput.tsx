import React, { forwardRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import Eye from "assets/images/eye.svg";
import Key from "assets/images/key.svg";
import Email from "assets/images/msg.svg";
import InputGradient from "./inputGradient";

interface InputProps {
  control: Control<any, any>;
  errors: any;
  name: string;
  rules: any;
  placeholder?: string;
  defaultValue?: string;
  showTitle?: boolean;
  type?: React.ComponentProps<typeof TextInput>["textContentType"];
}

export const Input: React.FC<InputProps> = forwardRef(
  ({ control, errors, name, rules, placeholder, defaultValue, showTitle, type }, ref) => {
    const [showPassword, setShowPassword] = useState(type === "password");

    return (
      <View>
        {showTitle && <Text className="color-input text-base mb-[5px]"> {placeholder} </Text>}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputGradient>
              <View className="flex-row">
                {type === "emailAddress" && <Email />}
                {type === "password" && <Key />}
                <TextInput
                  ref={ref}
                  aria-hidden={true}
                  secureTextEntry={showPassword}
                  className={`h-[100%] w-[250px] color-input text-base pr-[13px] ml-[14px] mt-[2px]  `}
                  placeholder={placeholder ?? ""}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
              {type === "password" && (
                <TogglePassword onPress={() => setShowPassword((show) => !show)} />
              )}
            </InputGradient>
          )}
          name={name}
          rules={rules}
          defaultValue={defaultValue}
        />
        {errors[name] && <Text className="text-danger mt-[5px] ">{errors[name].message}</Text>}
      </View>
    );
  }
);

const TogglePassword = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Eye />
    </TouchableOpacity>
  );
};
