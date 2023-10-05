import { FlatList, Text, View } from "react-native";
import { Exercise } from "types/index";

const Instructions = ({ exercise }: { exercise?: Exercise }) => {
  return (
    <>
      <Text
        className={`text-white
         text-[19px]
         font-bold capitalize mt-[24px] mb-[17px] ml-[4px]`}
      >
        Instructions:
      </Text>

      <FlatList
        showsVerticalScrollIndicator={true}
        className="max-h-[50%] mb-[30px]"
        data={exercise?.instructions}
        renderItem={({ item }) => (
          <Text key={item} className="text-secondary font-13 mb-[12px] ml-[4px]">
            {item}
          </Text>
        )}
      />
    </>
  );
};

const InfoItem = ({ text, items }: { text: string; items: string[] }) => (
  <View className="flex-row mt-[5px]">
    <Text className="text-white text-15 font-bold capitalize"> {text}: </Text>
    <Text className="text-secondary text-15 capitalize"> {items?.join(", ")} </Text>
  </View>
);

export { InfoItem, Instructions };
