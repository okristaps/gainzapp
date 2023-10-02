import React from "react";

import { Text, View } from "react-native";
import IconButton from "./iconsHandle";

interface IconProps {
  text: string;
  items?: "start" | "end";
  hideText?: boolean;
  onPress?: () => void;
}

interface HeaderProps {
  title?: string;
  customChildren?: React.ReactNode;
  iconLeft?: IconProps;
  iconRight?: IconProps;
  justify?: "between" | "start" | "end" | "center";
  titleLength?: number;
}

const Header: React.FC<HeaderProps> = ({
  title = "Workouts",
  customChildren,
  iconLeft,
  iconRight,
  justify = "between",
  titleLength = 20,
}) => {
  const shortenText = (text: string) => {
    if (text.length > titleLength) {
      return text.slice(0, 17) + "...";
    }
    return text;
  };

  return (
    <View className={`flex w-[100%] h-[66px] flex-row justify-${justify}  items-center`}>
      {customChildren ? (
        customChildren
      ) : (
        <>
          <View className="w-[50px]">{iconLeft && <IconButton {...iconLeft} />}</View>
          <Text className="text-secondary text-[22px] font-medium">{shortenText(title)}</Text>
          <View className="w-[50px]">{iconRight && <IconButton {...iconRight} />}</View>
        </>
      )}
    </View>
  );
};

export default Header;

{
  /* <Header
iconLeft={{
  text: "Add",
  hideText: false,
}}
iconRight={{
  text: "Filter",
  items: "end",
}}
/> */
}
