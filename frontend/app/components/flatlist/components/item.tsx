import Thing from "assets/images/thing.svg";
import { shortenText } from "components/helpers";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View, LayoutAnimation } from "react-native";

interface ListItem {
  _id: string;
  name: string;
}

const customLayoutAnimationConfig = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
};

const RenderItem = ({
  item,
  customIconRight,
  customIconLeft,
  children,
  onPress,
  handleInfoPress,
  titleChildren,
  disabled = false,
  opened = false,
  extraClassname,
}: {
  item: ListItem;
  onPress?: () => void;
  customIconRight?: React.ReactNode;
  customIconLeft?: React.ReactNode;
  children?: React.ReactNode;
  titleChildren?: React.ReactNode;
  handleInfoPress?: () => void;
  disabled?: boolean;
  opened?: boolean;
  extraClassname?: string;
}) => {
  const handlePress = () => onPress?.();

  useEffect(() => {
    LayoutAnimation.configureNext(customLayoutAnimationConfig);
  }, [opened]);

  return (
    <View
      className={`border-[1px] rounded-[12px] pl-[15px] pr-[12.5px]
    border-${disabled ? "none" : "secondary"}

    ${extraClassname}`}
    >
      <TouchableOpacity
        className={`flex flex-col 
   
     
    
      m-h-["40px"]
        `}
        onPress={handlePress}
      >
        <View
          className={`
        flex-row  content-center h-[40px] justify-between ${
          opened && "border-b-2 border-secondary"
        }`}
        >
          <View className="flex-row items-center">
            {customIconLeft}
            <Text className="text-white font-bold text-15">{shortenText(item?.name, 33)}</Text>
            {titleChildren}
          </View>
          <TouchableOpacity
            disabled={!handleInfoPress || disabled}
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
      </TouchableOpacity>
      {opened && children}
    </View>
  );
};

export default RenderItem;
