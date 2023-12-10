import { PirmaryButtonEmpty } from "components/common/primarybutton";
import colors from "constants/colors";
import { Text, TouchableOpacity, View } from "react-native";
import { RenderItem } from "../../components";

import Check from "assets/images/check.svg";
import Info from "assets/images/info.svg";
import StopWatch from "assets/images/stopwatch.svg";

import { Categories } from "types/filters";
import { CardioItem, OtherItem } from "./otherItems";

export const InfoItem = ({
  title,
  subtitle,
  subsubtitle,
  extraClassname,
}: {
  title: string;
  subtitle?: string;
  subsubtitle?: string;
  extraClassname?: string;
}) => {
  return (
    <View className={`flex-col items-center gap-y-[8px] ` + extraClassname}>
      <Text className="text-white text-16 underline"> {title} </Text>
      <Text className="text-white text-14"> {subtitle ?? "-"}</Text>
      {subsubtitle && <Text className="text-white text-14"> {subsubtitle ?? "-"} </Text>}
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
  onEndPress,
}: {
  item: any;
  startedExercise: string;
  onStartPress: () => void;
  opened: boolean;
  onPress: () => void;
  onInfoPress: () => void;
  onCardioEndPress: (payload: any) => void;
  itemProgress: any;
  onEndPress: (sets: any) => void;
}) => {
  const { category, _id } = item.item;
  const { finished } = itemProgress || {};
  const startPhase = !startedExercise.length && !finished;
  const weightedCategories = [
    Categories.Strength,
    Categories.OlympicWeightlifting,
    Categories.Powerlifting,
    Categories.Strongman,
  ];

  const ContentItems = () => {
    if (category === Categories.Cardio) {
      return <CardioItem itemProgress={itemProgress} onPress={onCardioEndPress} />;
    }
    if (weightedCategories.includes(category)) {
      return <OtherItem itemProgress={itemProgress} onEndPress={onEndPress} />;
    }
  };

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
      {startPhase && (
        <View className="py-[16px] px-[30px]">
          <PirmaryButtonEmpty text="Start" onPress={onStartPress} />
        </View>
      )}
      <ContentItems />
    </RenderItem>
  );
};

export { StartedWoItem };
