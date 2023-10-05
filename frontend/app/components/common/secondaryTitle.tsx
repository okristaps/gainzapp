import React from "react";
import { Text } from "react-native";

interface Props {
  text: string;
}

const SecondaryTitle: React.FC<Props> = ({ text }) => {
  return <Text className="text-white font-bold text-20 text-center"> {text} </Text>;
};

export default SecondaryTitle;
