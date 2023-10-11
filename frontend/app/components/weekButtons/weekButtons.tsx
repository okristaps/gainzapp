import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

const days = ["M", "T", "W", "T", "F", "S", "S"];

const WeekButtons = () => {
  //TODO: Make day selection show the correspoding graphs etc.
  const [selectedDays, setSelectedDays] = useState<Boolean[]>(
    Array(7).fill(false)
  );

  const toggleDay = (index) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDays(newSelectedDays);
  };

  return (
    <View className="flex-row justify-center items-center gap-x-2.5 mt-2">
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          className={`w-10 h-10 justify-center items-center ${
            selectedDays[index]
              ? "border border-success bg-success"
              : "border border-primary"
          } rounded`}
          onPress={() => toggleDay(index)}
        >
          <Text className="text-sm font-bold text-primary">{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default WeekButtons;
