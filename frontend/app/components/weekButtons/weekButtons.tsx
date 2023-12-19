import React, { useContext } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { WeeklyInfoContext } from "../../contexts/weeklyInfoContext";
import moment from "moment";

const days = ["M", "Tu", "W", "T", "F", "S", "Su"];

const WeekButtons = () => {
  const { currentWeek, data } = useContext(WeeklyInfoContext);

  const weekDays: string[] = [];
  const givenDate = moment.utc(currentWeek, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const startOfWeek = givenDate.clone().startOf("week");

  for (let i = 0; i < 7; i++) {
    const currentDate = startOfWeek.clone().add(i + 1, "days");
    weekDays.push(currentDate.format("YYYY-MM-DD"));
  }

  const workoutDates = Object.keys(data?.workouts ?? {});

  return (
    <View className="flex-row justify-between items-center  mt-2">
      {weekDays.map((day, index) => (
        <TouchableOpacity
          key={day}
          disabled
          className={`w-10 h-10 justify-center items-center border rounded ${
            workoutDates.includes(day) ? "border-success bg-success" : "border-primary"
          }`}
        >
          <Text className="text-sm font-bold text-primary">{days[index]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default WeekButtons;
