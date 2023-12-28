import { AuthContext } from "auth/authManager";
import { PirmaryButton } from "components/common/primarybutton";
import Header from "components/header";
import { Input } from "components/inputs/formInput";
import { router } from "expo-router";
import React, { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";

export default function TabProfilePreferences() {
  const { userData } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      display_name: userData?.display_name,
      email: userData?.email,
    },
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      console.log("data", data);
    },

    [getValues, isValid, errors]
  );

  const inputFields = [
    {
      type: "name",
      name: "display_name",
      rules: {
        required: "Name is required",
      },
      placeholder: "Display name",
    },
    {
      type: "email",
      name: "email",
      rules: {
        required: "Email is required",
        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
      },
      placeholder: "Email",
    },
    {
      type: "none",
      name: "age",
      placeholder: "Age",
    },
    {
      type: "none",
      name: "height",
      placeholder: "Height (cm)",
    },
  ];

  return (
    <View className="flex flex-1 pl-[20px] pr-[20px]">
      <Header
        title="Account Info"
        iconLeft={{
          text: "Back",
          hideText: true,
          onPress: () => router.back(),
        }}
      />
      <ScrollView
        bounces={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          display: "flex",
          flex: 1,
        }}
      >
        <View className="flex flex-1 flex-col content-between">
          <View>
            {inputFields.map((field, index) => (
              <View key={field.name} className="mt-[10px]">
                <Input
                  type={field.type}
                  showTitle={true}
                  name={field.name}
                  control={control}
                  errors={errors}
                  rules={field.rules}
                  placeholder={field.placeholder}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <PirmaryButton text={`Save`} onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
