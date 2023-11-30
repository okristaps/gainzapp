import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Triangle from "assets/images/thing.svg";
import colors from "constants/colors";
import Chart from "./chart";

const InfoBoxes = () => {
  return (
    <>
      <PreviousWorkout />
      <WeeklySummary />
      <Chart />
    </>
  );
};

const PreviousWorkout = () => {
  return (
    <View className="mt-6 mb-2 px-4 pt-2 pb-4 bg-input rounded-lg">
      <View className="flex-row justify-between items-center">
        <Text className="text-secondary text-12">Previous Workout</Text>
        <Text className="text-secondary text-11">1H 26Min</Text>
      </View>
      <Text className="text-lg text-primary font-bold ">Workout 1</Text>
      <View className="flex-row justify-between items-center mt-6">
        <Text className="text-12 text-primary">Thurs. June 22nd</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-primary text-12 mr-1 underline"> See Details</Text>
          <Triangle className="rotate-180 " fill={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WeeklySummary = () => {
  const Item = ({ title, value }: { title: string; value: string }) => {
    return (
      <View className="items-center">
        <Text className="text-primary font-bold mb-[15px]">{title}</Text>
        <Text className="text-primary font-semibold text-20">{value}</Text>
      </View>
    );
  };
  return (
    <View className="my-2 px-4 pt-2 pb-4 bg-input rounded-lg">
      <Text className="text-secondary text-12 mb-3">Weekly Summary</Text>
      <View className="flex-row justify-between items-center">
        <Item title={"Workouts"} value={"3"} />
        <Item title={"Time Spent"} value={"3hrs 20min"} />
        <Item title={"PR's Hit"} value={"3"} />
      </View>
    </View>
  );
};

export default InfoBoxes;
