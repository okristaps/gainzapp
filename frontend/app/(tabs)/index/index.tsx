import InfoBoxes from "components/dashboard/dashboardScreen";
import Header from "components/header";
import ProfilePicture from "components/header/profile";
import WeekNavigation from "components/header/weekSwitch";
import WeekButtons from "components/weekButtons/weekButtons";
import React from "react";
import { ScrollView, View } from "react-native";

const Dashboard = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1">
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
      <WeekButtons />
      <InfoBoxes />
    </ScrollView>
  );
};

export default Dashboard;
