import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { End, InfoItem } from "../items";
import OtherInputModal from "components/modals/inputModal/otherInputModal";

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
}: {
  itemProgress: any;
  onEndPress: (sets: any) => void;
}) => {
  const [sets, setSets] = useState(itemProgress?.sets ?? [initial]);
  const [modal, setModal] = useState(modalInitial);
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
                subtitle={item.weight ? item.weight + "kg" : "-"}
                subsubtitle={item.reps ? item.reps + "x" : "-"}
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
        />
      )}
    </View>
  );
};

export default OtherItem;
