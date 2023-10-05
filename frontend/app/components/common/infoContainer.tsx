import InputGradient from "components/inputs/inputGradient";
import React from "react";
import { Text, View } from "react-native";

const InfoContainer = ({ forces, equipment }: { forces: string[]; equipment: string[] }) => {
  const Item = ({ text, items }: { text: string; items: string[] }) => {
    return (
      <View className="flex-row">
        <Text className="text-white text-12  "> {text}: </Text>
        <Text className="text-secondary text-12 capitalize "> {items?.join(", ")} </Text>
      </View>
    );
  };
  return (
    <InputGradient extraClassName={"mt-[30px] pt-[7px] pb-[7px] items-start h-[50px] "}>
      <View className="h-[100%] justify-between">
        <Item text={"Forces"} items={forces} />
        <Item text={"Equipment"} items={equipment} />
      </View>
    </InputGradient>
  );
};

export default InfoContainer;
