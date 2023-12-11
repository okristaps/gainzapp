import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import OtherInputModal from "components/modals/inputModal/otherInputModal";
import useElapsedTime from "../../../../hooks/timerHook";
import moment from "moment";
import { End } from "./components";
import { Categories, noWeightEquipment, reppedWithoutWeightCategories } from "types/filters";

const metersToKilometers = (meters: number) => {
  const kilometers = meters / 1000;
  return kilometers.toFixed(2);
};

const initial = {
  weight: null,
  reps: null,
};

const modalInitial = {
  visible: false,
  payload: null,
};

const OtherItem = ({
  itemProgress,
  onEndPress,
  category,
}: {
  itemProgress: any;
  onEndPress: (sets: any) => void;
  category: Categories;
}) => {
  const [sets, setSets] = useState(itemProgress?.sets ?? [initial]);
  const [modal, setModal] = useState(modalInitial);

  const withoutWeight: boolean =
    reppedWithoutWeightCategories.includes(category) ||
    noWeightEquipment.includes(itemProgress?.equipment);

  const handleDelete = (index: number) =>
    Alert.alert("Do you want to delete this set ?", "", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => deleteSet(index),
      },
    ]);

  const addSet = () => {
    setSets([...sets, initial]);
  };

  const deleteSet = (index: number) => {
    const newSets = [...sets];
    newSets.splice(index, 1);
    setSets(newSets);
  };

  const handleSets = useCallback(
    (payload: any) => {
      const newSets = [...sets];
      newSets[payload.index] = payload;
      setSets(newSets);
      setModal(modalInitial);
    },
    [sets, modal]
  );

  const Items = useCallback(() => {
    return (
      <ScrollView horizontal scrollEnabled className="gap-x-[8px] justiffy-center ">
        {sets.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              onPress={() =>
                !itemProgress.finished && setModal({ visible: true, payload: { ...item, index } })
              }
              onLongPress={() => !itemProgress.finished && handleDelete(index)}
              key={index}
              className="w-[80px] border border-secondary items-center rounded-[12px] mb-[16px] p-[8px] "
            >
              <InfoItem
                title={"Set " + (index + 1)}
                subtitle={item.reps ? item.reps + "x" : "-"}
                subsubtitle={withoutWeight ? undefined : item.weight ? item.weight + "kg" : "-"}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }, [sets]);

  return (
    <View>
      {itemProgress.started && (
        <View className="flex flex-row justify-between mt-[12px] ">
          <TouchableOpacity onPress={addSet} disabled={sets.length > 9}>
            <Text className="text-secondary font-bold ">+ Add set</Text>
          </TouchableOpacity>
          <End
            handleEnd={() => onEndPress(sets)}
            disabled={sets.some((item: any) => item.reps === null)}
          />
        </View>
      )}
      <View className="flex flex-row items-center justify-center mt-[12px] ">
        <Items />
      </View>
      {modal.visible && (
        <OtherInputModal
          payload={modal.payload}
          visible={modal.visible}
          setVisible={() => setModal(modalInitial)}
          onSave={handleSets}
          withoutWeight={withoutWeight}
        />
      )}
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
      {subsubtitle && <Text className="text-white text-14"> {subsubtitle ?? "-"} </Text>}
    </View>
  );
};

export { OtherItem, CardioItem, InfoItem };
