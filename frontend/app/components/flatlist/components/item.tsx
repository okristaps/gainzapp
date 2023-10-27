import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { shortenText } from "components/helpers";
import Thing from "assets/images/thing.svg";

interface ListItem {
  _id: string;
  name: string;
}

const RenderItem = ({
  item,
  customIconRight,
  customIconLeft,
  children,
  onPress,
  handleInfoPress,
  disabled = false,
}: {
  item: ListItem;
  onPress?: () => void;
  customIconRight?: React.ReactNode;
  customIconLeft?: React.ReactNode;
  children?: React.ReactNode;
  handleInfoPress?: () => void;
  disabled?: boolean;
}) => {
  const [opened, setOpened] = React.useState(false);
  const handlePress = () => (children ? setOpened((opened) => !opened) : onPress?.());
  console.log("disabled", disabled);
  return (
    <TouchableOpacity
      disabled={disabled}
      key={item?._id}
      className={`flex w-[100%] flex-col 
      border-[1px] rounded-[12px] pl-[15px] pr-[12.5px]
      border-${disabled ? "none" : "secondary"}
      h-[${opened ? "140px" : "40px"}]
        `}
      onPress={handlePress}
    >
      <View
        className={`flex-row content-center h-[40px] w-[100%] justify-between ${
          opened && "border-b-2 border-secondary"
        }`}
      >
        <View className="flex-row items-center">
          {customIconLeft}
          <Text className="text-white font-bold text-15">{shortenText(item?.name, 33)}</Text>
        </View>
        <TouchableOpacity
          onPress={handleInfoPress}
          className="h-[100%] w-[30px] pl-[10px] flex justify-center self-end "
        >
          {customIconRight ?? (
            <View className={opened ? "-rotate-90 mb-[10px] ml-[5px]" : "rotate-180"}>
              <Thing stroke="white" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {opened && children}
    </TouchableOpacity>
  );
};

export default RenderItem;
