import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import Close from "assets/images/close.svg";
import { shortenText } from "components/helpers";

interface exerdata {
  _id: string;
  name: string;
}

const ExercisesHorizontal = ({
  data,
  onItemPress,
}: {
  data: exerdata[];
  onItemPress: (item: exerdata) => void;
}) => {
  const Item = ({ item }: { item: exerdata }) => {
    return (
      <TouchableOpacity
        key={item?._id}
        className={`flex flex-row items-center  border-secondary border-[1px] rounded-[20px] pl-[10px] pr-[3px] h-[35px] z-2`}
      >
        <Text className="text-white text-14 text-center">{shortenText(item.name, 16)} </Text>
        <TouchableOpacity onPress={() => onItemPress(item)} className="ml-[5px]  justify-center">
          <Close fill="#ffffff" height={18} width={18} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <FlashList
      data={data}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="w-[10px]" />}
      renderItem={Item}
      horizontal={true}
      scrollEnabled={true}
      estimatedItemSize={200}
    />
  );
};

export default ExercisesHorizontal;
