import { PirmaryButtonEmpty } from "components/common/primarybutton";
import colors from "constants/colors";
import { Text, TouchableOpacity, View } from "react-native";
import { RenderItem } from "../../components";

import Check from "assets/images/check.svg";
import Info from "assets/images/info.svg";
import StopWatch from "assets/images/stopwatch.svg";

import moment from "moment";
import { Categories } from "types/filters";
import useElapsedTime from "../../../../hooks/timerHook";
import OtherItem from "./otherItems";

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

const metersToKilometers = (meters: number) => {
  const kilometers = meters / 1000;
  return kilometers.toFixed(2); // Display two decimal places
};

const CardioItem = ({
  onPress,
  itemProgress,
}: {
  onPress: (payload: any) => void;
  itemProgress: any;
}) => {
  const { finished, startTime, time } = itemProgress || {};
  const elapsedTime = useElapsedTime(startTime, finished);

  const formattedTime = moment.utc(elapsedTime.asMilliseconds()).format("HH:mm:ss");

  const handleEnd = () => {
    onPress({
      time: formattedTime,
      distance: 1000,
    });
  };

  return (
    <View className="flex flex-row justify-between mt-[12px] items-center mb-[16px]">
      <InfoItem
        extraClassname="flex-[0.33]"
        title="Time"
        subtitle={!finished ? formattedTime : time}
      />
      <InfoItem
        extraClassname="flex-[0.33]"
        title="Distance"
        subtitle={itemProgress?.distance ? metersToKilometers(itemProgress?.distance) + "km" : "-"}
      />
      {!finished && <End handleEnd={handleEnd} />}
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

  const weightedCategories = [
    Categories.Strength,
    Categories.OlympicWeightlifting,
    Categories.Powerlifting,
    Categories.Strongman,
  ];

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
      {/* {!startedExercise.length && !finished ? (
        <View className="py-[16px] px-[30px]">
          <PirmaryButtonEmpty text="Start" onPress={onStartPress} />
        </View>
      ) : (
        <View>
          {category === Categories.Cardio && (
            <CardioItem itemProgress={itemProgress} onPress={onCardioEndPress} />
          )}
          {weightedCategories.includes(category) && (
            <OtherItem itemProgress={itemProgress} onEndPress={onEndPress} />
          )}
        </View>
      )} */}
    </RenderItem>
  );
};

const End = ({ handleEnd, disabled }: { handleEnd: () => void; disabled?: boolean }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      className="flex flex-row flex-[0.33] justify-end mb-[px]"
      onPress={handleEnd}
    >
      <Text className={`text-${disabled ? "secondary" : "success"} font-bold underline`}>
        {" "}
        End{" "}
      </Text>
      {/* <Stop height={18} width={18} fill={disabled ? colors.primary : colors.success} /> */}
    </TouchableOpacity>
  );
};

export { End, StartedWoItem };
