import { FlashList } from "@shopify/flash-list";
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Close from "assets/images/close.svg";
import { shortenText } from "components/helpers";
import { ExerciseIdentifier } from "types/index";

const ExercisesHorizontal = ({
  data,
  onItemPress,
}: {
  data: ExerciseIdentifier[];
  onItemPress: (item: ExerciseIdentifier) => void;
}) => {
  const list = useRef<FlashList<number> | null>(null);

  const renderItem = React.useMemo(() => {
    const renderFunction = ({ item }: { item: ExerciseIdentifier }) => {
      return (
        <TouchableOpacity
          key={item?._id}
          className={`flex flex-row items-center  border-secondary border-[1px] rounded-[20px] pl-[10px] pr-[3px] h-[35px] z-2`}
        >
          <Text className="text-white text-14 text-center">{shortenText(item.name, 16)} </Text>
          <TouchableOpacity
            onPress={() => {
              onItemPress(item);
            }}
            className="ml-[5px]  justify-center"
          >
            <Close fill="#ffffff" height={18} width={18} />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    };
    return renderFunction;
  }, [data]);

  return (
    <FlashList
      data={data}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="w-[10px]" />}
      renderItem={renderItem}
      horizontal={true}
      scrollEnabled={true}
      estimatedItemSize={200}
    />
  );
};

export default ExercisesHorizontal;
