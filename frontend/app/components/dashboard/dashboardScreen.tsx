import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import Triangle from "assets/images/thing.svg";
import { AuthContext } from "auth/authManager";
import Loader from "components/loader/loader";
import colors from "constants/colors";
import { router } from "expo-router";
import moment from "moment";

const formatTimeSpent = (seconds: number) => {
  const duration = moment.duration(seconds, "seconds");
  const hours = duration.hours();
  const minutes = duration.minutes();
  let formattedTime = "";
  if (hours > 0) {
    formattedTime += `${hours}hrs `;
  }

  formattedTime += `${minutes}min`;
  return formattedTime;
};

const WeeklySummary = ({ summary }: { summary: any }) => {
  const Item = ({ title, value }: { title: string; value: string }) => {
    return (
      <View className="items-center">
        <Text className="text-primary font-bold mb-[15px]">{title}</Text>
        <Text className="text-primary font-semibold text-20">{value}</Text>
      </View>
    );
  };
  return (
    <View className="mt-6 px-4 pt-2 pb-4 bg-input rounded-lg  h-[110px]">
      <Text className="text-secondary text-12 mb-3">Weekly Summary</Text>
      {summary?.timeSpent > 0 ? (
        <View className="flex-row justify-between items-center">
          <Item title={"Workouts"} value={summary?.workoutsCount} />
          <Item title={"Time Spent"} value={formatTimeSpent(summary?.timeSpent)} />
          <Item title={"Exercises"} value={summary?.exercisesCount} />
        </View>
      ) : (
        <View className="flex-col justify-between">
          <Text className="text-white font-bold text-20">No workouts recorder this week :( </Text>
          <Text className="text-white font-medium text-16 mt-[5px]">
            Don't let this happen again!
          </Text>
        </View>
      )}
    </View>
  );
};

const PreviousWorkout = () => {
  const { userData } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
    retry: 0,
    queryKey: ["latestWorkout"],
    queryFn: async () => await getBe({ path: `/completed/${userData?.uid}/latest` }),
  });

  const durationArray = data?.duration?.split(":");

  const duration = durationArray
    ? moment.duration({
        hours: parseInt(durationArray[0], 10),
        minutes: parseInt(durationArray[1], 10),
        seconds: parseInt(durationArray[2], 10),
      })
    : [];

  const Info = () => {
    return (
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="text-secondary text-12">Previous Workout</Text>
          <Text className="text-secondary text-11">
            {moment(data?.timestamp).format("ddd. MMMM Do")}
          </Text>
        </View>
        <Text className="text-lg text-primary font-bold ">{data?.name}</Text>
        <View className="flex-row justify-between items-center mt-6">
          <Text className="text-12 text-primary">{formatTimeSpent(duration)}</Text>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => {
              router.push({
                pathname: "logs/viewPastWorkout",
                params: { workoutId: data?._id, justFinished: false },
              });
            }}
          >
            <Text className="text-primary text-12 mr-1 underline"> See Details</Text>
            <Triangle className="rotate-180 " fill={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const NoData = () => {
    return (
      <View>
        <Text className="text-white font-bold text-20">Create and start your first workout! </Text>
        <TouchableOpacity onPress={() => router.replace("/workouts")}>
          <Text className="text-white font-medium text-16 mt-[5px] underline">
            Create a workout here{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className=" my-3 mt-5 px-4 pt-2 pb-4 bg-input rounded-lg">
      {isLoading ? <Loader /> : data?.duration ? <Info /> : <NoData />}
    </View>
  );
};

export { PreviousWorkout, WeeklySummary };
