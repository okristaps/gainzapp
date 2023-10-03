import React from "react";
import { FlatList, Text, View } from "react-native";
import RenderItem from "./item";

const data = [
  { id: "1", text: "Full-Body Strength Training" },
  { id: "2", text: "Cardio Blast" },
  { id: "3", text: "Full-Body Strength TrainingItem 3" },
  { id: "4", text: "Full-Body Strength TrainingItem 1" },
  { id: "5", text: "Full-Body Strength TrainingasdasdasdasItem 2" },
  { id: "6", text: "Full-Body Strength TrainingItem 3" },
  { id: "7", text: "Item 1" },
  { id: "8", text: "Full-Body Strength TrainingItem 2" },
  { id: "9", text: "Full-Body Strength TrainingItem 3" },
  { id: "10", text: "Full-Body Strength TrainingItem 1" },
  { id: "11", text: "Full-Body Strength TrainingItem 2" },
  { id: "12", text: "Full-Body Strength TrainingItem 3" },
];

const WorkoutsFlatlist: React.FC = () => {
  return (
    <FlatList
      ItemSeparatorComponent={<View className="h-[10px]" />}
      pagingEnabled={true}
      className="flex flex-1 mt-[25px]"
      showsVerticalScrollIndicator={false}
      data={data}
      ListEmptyComponent={<Text className="text-white"> No workouts </Text>}
      renderItem={(item) => <RenderItem item={item.item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default WorkoutsFlatlist;
