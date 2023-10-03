import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Animated, Easing } from "react-native";

interface CustomSwitchProps {
  text1?: string;
  text2?: string;
  value: boolean;
  setValue: (value: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  text1 = "App's Workouts",
  text2 = "Custom",
  value,
  setValue,
}) => {
  const [animatedValue] = useState(new Animated.Value(0));

  const toggleSwitch = () => {
    setValue(!value);
  };

  useEffect(() => {
    const duration = 100;
    const toValue = value ? 0 : 1;

    Animated.timing(animatedValue, {
      toValue,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [value, animatedValue]);

  const successColorTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 144],
  });

  return (
    <View className="flex-row h-[29px] w-[288px] overflow-hidden self-center">
      <Animated.View
        className="z-10 absolute w-[144px] h-[29px] bg-success transform rounded-[5px]"
        style={{
          transform: [{ translateX: successColorTranslateX }],
        }}
      />
      <Button toggleSwitch={toggleSwitch} value={value} text={text1} id={1} />
      <Button toggleSwitch={toggleSwitch} value={!value} text={text2} id={2} />
    </View>
  );
};

interface ButtonProps {
  toggleSwitch: () => void;
  id?: number;
  value: boolean;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ toggleSwitch, value, text, id }) => {
  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      className={`flex flex-1 items-center justify-center
      ${value && "rounded-[5px] border-secondary z-20 ml-[-10px]"}
      ${!value && "border-[1px] rounded-[5px] border-secondary z-0"}
      ${id === 2 && !value && "border-l-0"}
    `}
    >
      <Text
        className={`text-${value ? "primary font-bold" : "secondary font-regular"} 
        center
        text-15
        ${id === 1 && value && "ml-[20px]"}`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomSwitch;
