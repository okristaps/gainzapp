import InputGradient from "components/inputs/inputGradient";
import React from "react";
import { Text, View } from "react-native";

import Biceps from "assets/images/bicep.svg";

type ItemProps = {
  text: string;
  items: string[];
};

type InfoContainerProps = {
  forces: string[];
  equipment: string[];
};

type ExerciseInfo = {
  title?: string;
  sub?: string;
};

const InfoItem: React.FC<ItemProps> = ({ text, items }) => (
  <View className="flex-row">
    <Text className="text-white text-12"> {text}: </Text>
    <Text className="text-secondary text-12 capitalize"> {items?.join(", ")} </Text>
  </View>
);

const ExerciseInfoItem: React.FC<ExerciseInfo> = ({ title, sub }) => (
  <View className="flex-col">
    <Text className="text-white text-center font-bold text-15">{title}</Text>
    <Text className="text-white text-center font-regular text-12">{sub}</Text>
  </View>
);


// Export this stuff

const InfoContainer: React.FC<InfoContainerProps> = ({ forces, equipment }) => (
  <InputGradient extraClassName="mt-[30px] pt-[9px] pb-[9px] items-start h-[50px] bg-default">
    <View className="h-[100%] justify-between">
      <InfoItem text="Forces" items={forces} />
      <InfoItem text="Equipment" items={equipment} />
    </View>
  </InputGradient>
);

const ExerciseInfoContainer: React.FC<{ info1?: ExerciseInfo; info2?: ExerciseInfo }> = ({
  info1,
  info2,
}) => (
  <InputGradient extraClassName="flex-row mt-[30px] pt-[7px] px-[30px] pb-[7px] h-[50px] justify-between items-center">
    <ExerciseInfoItem {...info1} />
    <Biceps className="mt-[8px]" />
    <ExerciseInfoItem {...info2} />
  </InputGradient>
);

export { InfoContainer, ExerciseInfoContainer };
