import Header from "components/header";
import ProfilePicture from "components/header/profile";
import WeekNavigation from "components/header/weekSwitch";
import React from "react";
import { View, Text } from "react-native";

const Dashboard = () => {
  return (
    <Header
      justify="between"
      customChildren={
        <>
          <ProfilePicture />
          <WeekNavigation />
          <View className="w-[37px]" />
        </>
      }
    />
  );
};

export default Dashboard;
