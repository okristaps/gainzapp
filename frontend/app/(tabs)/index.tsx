import Header from "components/header";
import ProfilePicture from "components/header/profile";
import WeekNavigation from "components/header/weekSwitch";
import Wrapper from "components/layout/wrapper";
import React from "react";
import { View } from "react-native";

const Dashboard = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Dashboard;
