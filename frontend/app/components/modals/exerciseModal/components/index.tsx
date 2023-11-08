import { Text, TouchableOpacity } from "react-native";
import { Exercise } from "types/index";

const Instructions = ({ exercise }: { exercise?: Exercise }) => {
  return (
    <>
      {exercise?.instructions?.map((i: any) => {
        return (
          <Text key={i} className="text-secondary font-13 mb-[12px] ml-[4px]">
            {i}
          </Text>
        );
      })}
    </>
  );
};

const InfoItem = ({ text, items }: { text: string; items: string[] }) => (
  <TouchableOpacity className="flex-row mt-[5px]">
    <Text className="text-white text-15 font-bold capitalize"> {text}: </Text>
    <Text className="text-secondary text-15 capitalize"> {items?.join(", ")} </Text>
  </TouchableOpacity>
);

export { InfoItem, Instructions };
