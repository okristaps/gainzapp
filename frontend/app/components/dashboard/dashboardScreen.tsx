import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";

import TriangleLeft from "../../../src/assets/images/triangle_right.svg";
import TriangleDown from "../../../src/assets/images/triangle_down.svg";

// Components for each box
const PreviousWorkout = () => {
  return (
    <View className="mt-5 mb-2 p-4 bg-input rounded-lg">
      <View className="flex-row justify-between items-center">
        <Text className="text-secondary text-12">Previous Workout</Text>
        <Text className="text-secondary text-10">1H 26Min</Text>
      </View>
      <View className="">
        <Text className="text-lg text-primary">Workout 1</Text>
      </View>
      <View className="flex-row justify-between items-center mt-3">
        <Text className="text-12 text-primary">Thurs. June 22nd</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-primary text-12 mr-1">See Details</Text>
          <TriangleLeft />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WeeklySummary = () => {
  return (
    <View className="my-2 p-4 bg-input rounded-lg">
      <Text className="text-secondary text-12 mb-3">Weekly Summary</Text>
      <View className="flex-row justify-between">
        <View className="items-center">
          <Text className="text-primary font-semibold">Workouts</Text>
          <Text className="text-primary font-semibold text-20">3</Text>
        </View>
        <View className="items-center">
          <Text className="text-primary font-semibold">Time Spent</Text>
          <Text className="text-primary font-semibold text-20">3hrs 20min</Text>
        </View>
        <View className="items-center">
          <Text className="text-primary font-semibold">PR's Hit</Text>
          <Text className="text-primary font-semibold text-20">3</Text>
        </View>
      </View>
    </View>
  );
};

interface Workout {
  title: string;
  data: number[];
}

const workouts: Workout[] = [
  {
    title: "Bicep Curls",
    data: [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
    ],
  },
  {
    title: "Tricep Pushdowns",
    data: [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
    ],
  },
];

const Chart = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(workouts[0]);

  const selectWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setDropdownVisible(false);
  };

  return (
    <View className="my-2 p-4 bg-input rounded-lg">
      <Text className="text-secondary text-12 mb-3">Progress</Text>
      <View>
        <TouchableOpacity
          className="flex-row items-center justify-center mb-3"
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text className="text-primary font-semibold mr-1">
            {selectedWorkout.title}
          </Text>
          <TriangleDown />
        </TouchableOpacity>

        {dropdownVisible && (
          <View
            className="absolute bg-input rounded-lg mt-5 border border-success p-2"
            style={{ zIndex: 1, left: "27%" }}
          >
            {workouts.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => selectWorkout(item)}
                className="p-2"
              >
                <Text className="text-primary">{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <LineChart
          data={{
            labels: ["J", "F", "M", "A", "M", "J"],
            datasets: [
              {
                data: selectedWorkout.data,
              },
            ],
          }}
          width={300}
          height={220}
          yAxisSuffix="%"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#282C30",
            backgroundGradientFrom: "#282C30",
            backgroundGradientTo: "#282C30",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "5",
              stroke: "#88BB46",
            },
          }}
          bezier
        />
      </View>
    </View>
  );
};

// Container component for all boxes
const InfoBoxes = () => {
  return (
    <View className="flex-1">
      <PreviousWorkout />
      <WeeklySummary />
      <Chart />
    </View>
  );
};

export default InfoBoxes;
