import Chart from "components/dashboard/chart";
import { PreviousWorkout, WeeklySummary } from "components/dashboard/dashboardScreen";
import Header from "components/header";
import ProfilePicture from "components/header/profile";
import WeekNavigation from "components/header/weekSwitch";
import Loader from "components/loader/loader";
import WeekButtons from "components/weekButtons/weekButtons";
import React, { useCallback, useContext } from "react";
import { Pressable, ScrollView, View } from "react-native";
import * as Animatable from "react-native-animatable";
import WeeklyInfoManager, { WeeklyInfoContext } from "../contexts/weeklyInfoContext";
import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import { AuthContext } from "auth/authManager";

const Dashboard = () => {
  const { userData } = useContext(AuthContext);
  const { isLoading: chartLoading, data: chartData } = useQuery({
    retry: false,
    queryKey: ["exerciseProgress"],
    queryFn: async () =>
      await getBe({
        path: `/progress/favourite/${userData?.uid}`,
      }),
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 pr-[20px] pl-[20px]">
      <Pressable className="flex flex-1">
        <WeeklyStuff />
        {chartLoading ? <Loader /> : <Chart data={chartData} loading={chartLoading} />}
      </Pressable>
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
      <PreviousWorkout />
    </WeeklyInfoManager>
  );
};

const Comp = () => {
  const { loading, animationDirection, data, currentWeek } = useContext(WeeklyInfoContext);

  const Summary = useCallback(() => {
    return (
      <View>
        <View>
          <Animatable.View duration={300} animation={animationDirection}>
            <WeekButtons />
            <WeeklySummary summary={data?.summary} />
          </Animatable.View>
        </View>
      </View>
    );
  }, [data, currentWeek]);

  return <View className="h-[180px]">{loading ? <Loader /> : <Summary />}</View>;
};

export default Dashboard;
