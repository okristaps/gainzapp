import React from "react";

import { Text, View } from "react-native";
import IconButton from "./iconsHandle";
import { shortenText } from "components/helpers";

interface IconProps {
  text: string | null;
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
  return (
    <View className={`flex w-[100%] h-[66px] flex-row justify-${justify}  items-center`}>
      {customChildren ?? (
        <>
          <View className="w-[50px]">{iconLeft && <IconButton {...iconLeft} />}</View>
          <Text className="text-secondary text-[22px] font-medium">
            {shortenText(title, titleLength)}
          </Text>
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
