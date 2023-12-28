import { AuthContext } from "auth/authManager";
import { PirmaryButton } from "components/common/primarybutton";
import Header from "components/header";
import { router } from "expo-router";
import React, { useContext } from "react";
import { ScrollView, View } from "react-native";

export default function TabMeasurments() {
  const { userData } = useContext(AuthContext);

  return (
    <View className="flex flex-1 pl-[20px] pr-[20px]">
      <Header
        title="Measurments"
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
      ></ScrollView>
      <PirmaryButton text={`Save`} />
    </View>
  );
}
