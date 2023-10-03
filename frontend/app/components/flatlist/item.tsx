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
}: {
  item: ListItem;
  onPress?: () => void;
  customIconRight?: React.ReactNode;
  customIconLeft?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [opened, setOpened] = React.useState(false);
  const handlePress = () => (children ? setOpened((opened) => !opened) : onPress?.());

  return (
    <TouchableOpacity
      key={item?._id}
      className={`flex flex-col border-secondary border-[1px] rounded-[12px] px-[15px]
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
        <View className="h-[100%] w-[20px] flex justify-center self-end ">
          {customIconRight ?? (
            <View className={opened ? "-rotate-90 mb-[10px] ml-[5px]" : "rotate-180"}>
              <Thing stroke="white" />
            </View>
          )}
        </View>
      </View>

      {opened && children}
    </TouchableOpacity>
  );
};

export default RenderItem;
