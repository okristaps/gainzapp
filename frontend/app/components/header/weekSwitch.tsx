import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Thing from "assets/images/thing.svg";
import moment from "moment";
import { WeeklyInfoContext } from "../../contexts/weeklyInfoContext";

const WeekNavigation = () => {
  const { minWeek, maxWeek, currentWeek, goToPreviousWeek, goToNextWeek } =
    useContext(WeeklyInfoContext);

  const formattedWeek = currentWeek.format("w");
  const previousWeekStroke = currentWeek.isoWeek() <= minWeek ? "#7F8489" : "#FFFFFF";
  const nextWeekStroke = currentWeek.isoWeek() >= maxWeek ? "#7F8489" : "#FFFFFF";
  const isPreviousButtonDisabled = currentWeek.isoWeek() <= minWeek;

  return (
    <View className="flex flex-row content-between items-center">
      <TouchableOpacity
        onPress={goToPreviousWeek}
        className={`mr-[25px] h-[30px] w-[30px] items-center justify-center ${
          isPreviousButtonDisabled ? "opacity-50" : ""
        }`}
        disabled={isPreviousButtonDisabled}
      >
        <Thing stroke={previousWeekStroke} />
      </TouchableOpacity>

      <View key={formattedWeek}>
        <Text className="text-20 text-secondary font-medium text-center">{`Week ${formattedWeek}`}</Text>
      </View>

      <TouchableOpacity
        onPress={goToNextWeek}
        className="transform rotate-180 ml-[25px] h-[30px] w-[30px] items-center justify-center"
      >
        <Thing stroke={nextWeekStroke} />
      </TouchableOpacity>
    </View>
  );
};

export default WeekNavigation;
