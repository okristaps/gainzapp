import ModalWrapper from "components/modals/components/modalWrapper";
import React, { useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GeneralContex } from "../../../contexts/generalContext";

interface TermsAndConditionsModalProps {
  id: number;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  id,
  visible,
  setVisible,
}) => {
  const { termsData, policyData } = useContext(GeneralContex);
  const dataSet = id === 1 ? termsData : policyData;

  const DataBox = ({ data, index }: { data?: string[]; index: number }) => {
    return (
      <View>
        {data?.map((i: string) => (
          <Text className={`text-white flex flex-col ${index === 1 ? "" : "mt-[5px]"}`} key={i}>
            {i}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <ModalWrapper visible={visible} setVisible={setVisible} title={dataSet.title}>
      <ScrollView className="mt-[20px]">
        <TouchableOpacity>
          {Object.keys(dataSet.data).map((key: any, index) => {
            const { data, subtitle, title, subdata } = dataSet?.data[key] ?? {};

            return (
              <View key={title}>
                <Text
                  className={`text-white  text-[20px] font-bold mb-[10px]
                    ${index === 1 ? "mt-[0]" : "mt-[10px]"}`}
                >
                  {title}
                </Text>
                {subtitle && <Text className="font-semibold text-white mb-[5px]">{subtitle}</Text>}
                <DataBox data={data} index={index} />
                {subdata && (
                  <View>
                    <Text className={`text-white  text-[16px] font-semibold  mt-[5px] mb-[5px]`}>
                      {subdata?.title}
                    </Text>
                    <DataBox data={subdata?.data} index={index} />
                  </View>
                )}
              </View>
            );
          })}
        </TouchableOpacity>
      </ScrollView>
    </ModalWrapper>
  );
};

export default TermsAndConditionsModal;
