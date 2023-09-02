import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, Touchable, TouchableOpacity } from "react-native";

interface Props {
  text?: string;
  onPress?: () => void;
  loading?: boolean;
}

const PirmaryButton: React.FC<Props> = ({ text, onPress, loading }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        className="h-[50px] bg-input rounded-[15px] flex  justify-center"
        colors={["rgb(136,187,70)", "rgb(181,255,146)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        {loading ? (
          <ActivityIndicator size="large" color={"#7F8489"} />
        ) : (
          <Text className="text-center text-white text-18">{text}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const PirmaryButtonEmpty: React.FC<Props> = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-[50px] border border-success rounded-[15px] flex  justify-center "
    >
      <Text className="text-center text-success text-18">{text}</Text>
    </TouchableOpacity>
  );
};

export { PirmaryButton, PirmaryButtonEmpty };
