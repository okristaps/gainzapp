import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextInput, StyleSheet } from "react-native";
import { Text } from "../app/components/Themed";

interface InputProps {
  control: Control<any, any>;
  errors: any;
  name: string;
  rules: any;
  placeholder?: string;
  defaultValue?: string;
}

export const Input: React.FC<InputProps> = ({
  control,
  errors,
  name,
  rules,
  placeholder,
  defaultValue,
}) => {
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder || ""}
            value={value}
            onChangeText={onChange}
          />
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      {errors[name] && <Text style={styles.error}>{errors[name].message}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    color: "white",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
