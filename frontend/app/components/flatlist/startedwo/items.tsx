import ArrowThick from "assets/images/arrowthick.svg";
import { PirmaryButtonEmpty } from "components/common/primarybutton";
import colors from "constants/colors";
import { Text, TouchableOpacity, View } from "react-native";
import { RenderItem } from "../components";

import Check from "assets/images/check.svg";
import Info from "assets/images/info.svg";
import Stop from "assets/images/stop.svg";
import StopWatch from "assets/images/stopwatch.svg";

import { Categories } from "types/filters";

const SrengthItem = () => {
  return (
    <View>
      <View className="flex flex-row justify-between mt-[9px] mb-[18px]">
        <TouchableOpacity>
          <Text className="text-secondary font-bold underline"> Set count: 4 </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row items-center">
          <Text className="text-success font-bold underline"> Start set (3) </Text>
          <ArrowThick height={18} width={18} fill={colors.success} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between">
        {[1, 2, 3, 4].map((item) => {
          return (
            <View key={item} className="flex-col items-center gap-y-[8px] mb-[16px]">
              <Text className="text-white text-15 underline"> Set {item} </Text>
              <Text className="text-white text-14"> 70 kg's </Text>
              <Text className="text-white text-14"> 12 reps </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const CardioItem = ({ onPress, itemProgress }: { onPress: () => void; itemProgress: any }) => {
  const { finished } = itemProgress || {};
  return (
    <View className="flex flex-row justify-between mt-[12px] items-center mb-[16px]">
      <View className="flex-col items-center gap-y-[8px]  flex-[0.33]">
        <Text className="text-white text-15 underline"> Time </Text>
        <Text className="text-white text-14"> {itemProgress?.time ?? "-"} </Text>
      </View>
      <View className="flex-col items-center gap-y-[8px]  flex-[0.33]">
        <Text className="text-white text-15 underline"> Distance </Text>
        <Text className="text-white text-14"> {itemProgress?.distance ?? "-"} </Text>
      </View>
      {!finished && (
        <TouchableOpacity
          className="flex flex-row flex-[0.33] justify-end mb-[px]"
          onPress={onPress}
        >
          <Text className="text-success font-bold underline"> End </Text>
          <Stop height={18} width={18} fill={colors.success} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const StartedWoItem = ({
  item,
  startedExercise,
  onStartPress,
  opened,
  onPress,
  onInfoPress,
  onCardioEndPress,
  itemProgress,
}: {
  item: any;
  startedExercise: string;
  onStartPress: () => void;
  opened: boolean;
  onPress: () => void;
  onInfoPress: () => void;
  onCardioEndPress: () => void;
  itemProgress: any;
}) => {
  const { category, _id } = item.item;
  const { finished } = itemProgress || {};
  return (
    <RenderItem
      onPress={onPress}
      opened={opened}
      key={_id}
      item={item.item}
      titleChildren={
        <TouchableOpacity onPress={onInfoPress}>
          <Info className="ml-[10px]" />
        </TouchableOpacity>
      }
      customIconLeft={
        <View className="mr-[8px] ">
          {startedExercise === _id ? (
            <StopWatch stroke={colors.info} />
          ) : (
            <Check stroke={finished ? colors.success : colors.secondary} height={18} width={18} />
          )}
        </View>
      }
    >
      {!startedExercise.length && !finished ? (
        <View className="py-[16px] px-[30px]">
          <PirmaryButtonEmpty text="Start" onPress={onStartPress} />
        </View>
      ) : (
        <View>
          {category === Categories.Cardio && (
            <CardioItem itemProgress={itemProgress} onPress={onCardioEndPress} />
          )}
          {category === Categories.Strength || (category.includes("olympic") && <SrengthItem />)}
        </View>
      )}
    </RenderItem>
  );
};

export { CardioItem, SrengthItem, StartedWoItem };
