import React from "react";

import ArrowLeft from "assets/images/arrleft.svg";
import Filter from "assets/images/filter.svg";
import Edit from "assets/images/edit.svg";
import Add from "assets/images/add.svg";

import { TouchableOpacity, Text } from "react-native";
import { View } from "react-native";

interface Props {
  text?: string | null;
  hideText?: boolean;
  items?: string;
  onPress?: () => void;
}

const Icon = ({ name }) => {
  switch (name) {
    case "Back":
      return <ArrowLeft />;
      break;
    case "Filter":
      return <Filter />;
      break;
    case "Edit":
      return <Edit />;
      break;
    case "Create":
      return <Add />;
      break;
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
