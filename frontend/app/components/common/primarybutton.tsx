import colors from "constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface Props {
  text?: string;
  onPress?: () => void;
  loading?: boolean;
  color?: string;
  disabled?: boolean;
  extraClassName?: string;
  extraTextClassName?: string;
}

const PirmaryButton: React.FC<Props> = ({ text, onPress, loading }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        className="h-[50px] bg-input rounded-[15px] w-[100%]  justify-center"
        colors={colors.buttonGradient}
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

const PirmaryButtonEmpty: React.FC<Props> = ({
  text,
  onPress,
  loading,
  color,
  disabled,
  extraClassName,
  extraTextClassName,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      className={`h-[50px]  border border-${color ?? "success"}
      ${disabled && "border-input"}
        rounded-[15px]  w-[100%] justify-center ${extraClassName}`}
    >
      {loading ? (
        <ActivityIndicator size="large" color={color ?? "#7F8489"} />
      ) : (
        <Text
          className={`text-center text-${color ?? "success"} 
          ${disabled && "text-input"}
          text-18
          ${extraTextClassName}
          `}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export { PirmaryButton, PirmaryButtonEmpty };
