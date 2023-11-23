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
import { useEffect, useState } from "react";
import moment from "moment";
import useElapsedTime from "../../../hooks/timerHook";

const InfoItem = ({
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
      {subsubtitle && <Text className="text-white text-14"> {subsubtitle} </Text>}
    </View>
  );
};

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
            <InfoItem
              extraClassname="mb-[16px]"
              key={item}
              title={"Set" + item}
              subtitle="12kg"
              subsubtitle="10 reps"
            />
          );
        })}
      </View>
    </View>
  );
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
      elapsedTime: formattedTime,
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
        subtitle={itemProgress?.distance ?? "-"}
      />
      {!finished && (
        <TouchableOpacity
          className="flex flex-row flex-[0.33] justify-end mb-[px]"
          onPress={handleEnd}
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
  onCardioEndPress: (payload: any) => void;
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
          {category === Categories.Strength && <SrengthItem />}
        </View>
      )}
    </RenderItem>
  );
};

export { CardioItem, SrengthItem, StartedWoItem };
