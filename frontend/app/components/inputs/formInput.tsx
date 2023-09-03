import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "constants/colors";

import Eye from "assets/images/eye.svg";
import Key from "assets/images/key.svg";
import Email from "assets/images/msg.svg";

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

export const Input: React.FC<InputProps> = ({
  control,
  errors,
  name,
  rules,
  placeholder,
  defaultValue,
  showTitle,
  type,
}) => {
  const [showPassword, setShowPassword] = useState(type === "password");

  return (
    <View>
      {showTitle && <Text className="color-input text-base mb-[5px]"> {placeholder} </Text>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={colors.inputGradient}
            className="h-[48px]  pl-[18px] pr-[13px] rounded-[12px] flex flex-row items-center justify-between"
          >
            <View className="flex-row">
              {type === "emailAddress" && <Email />}
              {type === "password" && <Key />}
              <TextInput
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
          </LinearGradient>
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      {errors[name] && <Text className="text-danger mt-[5px] ">{errors[name].message}</Text>}
    </View>
  );
};

const TogglePassword = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Eye />
    </TouchableOpacity>
  );
};
