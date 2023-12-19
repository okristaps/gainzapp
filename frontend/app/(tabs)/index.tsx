import Chart from "components/dashboard/chart";
import { PreviousWorkout, WeeklySummary } from "components/dashboard/dashboardScreen";
import Header from "components/header";
import ProfilePicture from "components/header/profile";
import WeekNavigation from "components/header/weekSwitch";
import WeekButtons from "components/weekButtons/weekButtons";
import React, { useCallback, useContext } from "react";
import { ScrollView, View } from "react-native";
import WeeklyInfoManager, { WeeklyInfoContext } from "../contexts/weeklyInfoContext";
import Loader from "components/loader/loader";
import * as Animatable from "react-native-animatable";
const Dashboard = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 pr-[20px] pl-[20px]">
      <WeeklyStuff />
      <PreviousWorkout />
      <Chart />
    </ScrollView>
  );
};

const WeeklyStuff = () => {
  return (
    <WeeklyInfoManager>
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
      <Comp />
    </WeeklyInfoManager>
  );
};

const Comp = () => {
  const { loading, animationDirection, data, currentWeek } = useContext(WeeklyInfoContext);

  const Summary = useCallback(() => {
    return (
      <Animatable.View duration={300} animation={animationDirection}>
        <WeekButtons />
        <WeeklySummary summary={data?.summary} />
      </Animatable.View>
    );
  }, [data, currentWeek]);

  return <View className="h-[180px]">{loading ? <Loader /> : <Summary />}</View>;
};

export default Dashboard;
