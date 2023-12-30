import { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Triangle from "assets/images/thing.svg";

import { LineChart } from "react-native-chart-kit";
import colors from "constants/colors";

interface Workout {
  title: string;
  data: number[];
}

const data = [
  { date: "2023-01-01", weight: 15, reps: 10 },

  // Add more entries as needed
];

const filteredLabels = data.filter((entry, index) => index % 5 === 0).map((entry) => entry.date);

const mockData = {
  labels: filteredLabels,
  datasets: [
    {
      data: data.map((entry) => entry.weight),
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red for weight
      strokeWidth: 2,
    },
    {
      data: data.map((entry) => entry.reps),
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue for reps
      strokeWidth: 2,
    },
  ],
};

const workouts: Workout[] = [
  {
    title: "Bicep Curls",
    data: mockData,
  },
  {
    title: "Tricep Pushdowns",
    data: mockData,
  },
];

const Chart = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(workouts[0]);
  const screenWidth = Dimensions.get("window").width;
  const selectWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setDropdownVisible(false);
  };

  return (
    <View className="my-2 p-4 bg-input rounded-lg">
      <Text className="text-secondary text-12 mb-3">Progress</Text>
      <View className="items-center">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text className="text-15 text-primary font-bold ">{selectedWorkout.title}</Text>
          <Triangle
            className={`ml-[5px] ${dropdownVisible ? "-rotate-90 " : "rotate-180"}`}
            fill={colors.primary}
          />
        </TouchableOpacity>

        {dropdownVisible && (
          <View
            className="absolute bg-input rounded-lg mt-5 border border-success p-2"
            style={{ zIndex: 1, left: "27%" }}
          >
            {workouts.map((item, index) => (
              <TouchableOpacity
                key={item.title}
                onPress={() => selectWorkout(item)}
                className="p-2"
              >
                <Text className="text-primary">{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View className="mt-[20px] ">
          <LineChart
            xLabelsOffset={0}
            height={250}
            withVerticalLines={true}
            // onDataPointClick={(e) => console.log("asdsad", e)}
            data={mockData}
            width={screenWidth - 70}
            yAxisSuffix="kg"
            segments={5}
            yAxisInterval={5}
            style={{ paddingBottom: 0 }}
            chartConfig={{
              backgroundColor: colors.background,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                paddingBottom: 0,
                marginBottom: 0,
                paddingLeft: 0,
                padding: 0,
              },
              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: "#88BB46",
              },
            }}
            bezier
          />
        </View>
      </View>
    </View>
  );
};
export default Chart;
