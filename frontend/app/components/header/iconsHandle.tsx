import React from "react";

import Add from "assets/images/add.svg";
import ArrowLeft from "assets/images/arrleft.svg";
import Edit from "assets/images/edit.svg";
import Filter from "assets/images/filter.svg";

import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  text?: string | null;
  hideText?: boolean;
  items?: string;
  onPress?: () => void;
}

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case "Back":
      return <ArrowLeft />;
    case "Filter":
      return <Filter />;
    case "Edit":
      return <Edit />;
    case "Create":
      return <Add />;
    default:
      break;
  }
};

const IconButton: React.FC<Props> = ({ text, hideText, items = "start", onPress }) => {
  return (
    <TouchableOpacity className={`flex items-${items}`} onPress={onPress}>
      <View className="flex items-center justify-center h-[100%]">
        <Icon name={text} />
        {!hideText && <Text className="text-white text-[10px] text-regular"> {text} </Text>}
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
