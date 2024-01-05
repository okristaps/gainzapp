import { OtherItem } from "components/flatlist/startedwo/items/otherItems";
import ModalWrapper from "components/modals/components/modalWrapper";
import moment from "moment";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface ChartModalProps {
  data: any[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ChartProgressModal: React.FC<ChartModalProps> = ({ visible, setVisible, data }) => {
  return (
    <ModalWrapper visible={visible} setVisible={setVisible} title={data?.name}>
      <ScrollView>
        <Pressable className="flex flex-1">
          <View className="mt-[10px] flex items-center ">
            {data?.data?.map((item) => (
              <View key={item.date}>
                <Text className="text-secondary text-center">
                  {moment(item.date).format("DD-MM-YY HH:MM")}
                </Text>
                <OtherItem itemProgress={{ sets: item.sets, finished: true }} key={item.date} />
              </View>
            ))}
          </View>
        </Pressable>
      </ScrollView>
    </ModalWrapper>
  );
};

export default ChartProgressModal;
