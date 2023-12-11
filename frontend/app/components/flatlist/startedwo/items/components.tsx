import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

const End = ({ handleEnd, disabled }: { handleEnd: () => void; disabled?: boolean }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      className="flex flex-row flex-[0.33] justify-end mb-[px]"
      onPress={handleEnd}
    >
      <Text className={`text-${disabled ? "secondary" : "success"} font-bold underline`}>End</Text>
    </TouchableOpacity>
  );
};

export { End };
