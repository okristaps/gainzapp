import { postBe } from "api/index";
import { AuthContext } from "auth/authManager";
import { PirmaryButtonEmpty } from "components/common/primarybutton";
import { DateTimePickerComponent } from "components/dropdowns/dateTimePicker";
import DefaultDropdown from "components/dropdowns/defaultDropdown";
import Header from "components/header";
import { Input } from "components/inputs/input";

import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
export default function TabProfilePreferences() {
  const { userData, setUserData } = useContext(AuthContext);

  const initialState = {
    display_name: userData?.display_name ?? "",
    date: userData?.birthDate ?? null,
    sex: userData?.sex ?? "male",
  };

  const [display_name, setDisplay_name] = useState(userData?.display_name ?? "");
  const [date, setDate] = useState(userData?.birthDate);
  const [sex, setSex] = useState(userData?.sex ?? "male");
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(true);

  useEffect(() => {
    const isDisplayNameChanged = display_name !== initialState.display_name;
    const isDateChanged = date !== initialState.date;
    const isSexChanged = sex !== initialState.sex;

    if (isDisplayNameChanged || isDateChanged || isSexChanged) {
      if (display_name.length < 2 || date === null) {
        setInvalid(true);
      } else {
        setInvalid(false);
      }
    }
  }, [display_name, date, sex]);

  const createTwoButtonAlert = () =>
    Alert.alert("Failed to save", "Something went wrong", [{ text: "OK" }]);

  const saveData = async () => {
    const body = {
      sex,
      birthDate: date,
      display_name,
    };
    setLoading(true);
    await postBe({
      path: `/users/${userData?.uid}`,
      body,
    })
      .then(() => {
        router.replace("/profile");
        setUserData({
          ...userData,
          ...body,
        });
      })
      .catch(() => {
        createTwoButtonAlert();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View className="flex flex-1">
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
          <Input customValue={display_name} onChangeText={setDisplay_name} maxLength={30} />

          <View>
            <Text className="color-input text-base mb-[5px] mt-[10px]"> Gender </Text>
            <DefaultDropdown value={sex} setValue={setSex} />
          </View>
          <DateTimePickerComponent date={date} setDate={setDate} title="Birth date" />
        </View>
      </View>
      <PirmaryButtonEmpty text={`Save`} disabled={invalid} onPress={saveData} loading={loading} />
    </View>
  );
}
