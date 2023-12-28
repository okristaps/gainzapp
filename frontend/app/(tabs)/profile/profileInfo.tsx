import { AuthContext } from "auth/authManager";
import { PirmaryButton } from "components/common/primarybutton";
import { DateTimePickerComponent } from "components/dropdowns/dateTimePicker";
import DefaultDropdown from "components/dropdowns/defaultDropdown";
import Header from "components/header";
import { Input } from "components/inputs/input";

import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
export default function TabProfilePreferences() {
  const { userData } = useContext(AuthContext);
  const [display_name, setDisplay_name] = useState(userData?.display_name ?? "");
  const [date, setDate] = useState(new Date(1598051730000));

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
      <View className="flex flex-1 flex-col content-between">
        <View>
          <Text className="color-input text-base mb-[5px] mt-[10px]"> Email </Text>
          <Input customValue={userData?.email ?? ""} editable={false} />

          <Text className="color-input text-base mb-[5px] mt-[10px]"> Name </Text>
          <Input customValue={display_name} onChangeText={setDisplay_name} />

          <View>
            <Text className="color-input text-base mb-[5px] mt-[10px]"> Gender </Text>
            <DefaultDropdown />
          </View>
          <DateTimePickerComponent date={date} setDate={setDate} title="Birth date" />
        </View>
      </View>
      <PirmaryButton text={`Save`} />
    </View>
  );
}
