import { Text, View } from "react-native";
import { DropDownData } from "types/components";

const DropdownItem = ({
  item,
  data,
}: {
  item: { label: string; _index: number };
  data: DropDownData[];
}): React.JSX.Element | null => {
  return (
    <View
      key={item.label}
      className={`
              h-[45px] 
              justify-center 
              pl-[10px] 
              border-0
              bg-[#1E1E1E]
              ${item._index !== data.length - 1 && "border-b-[0.5px]"}
              border-secondary
            `}
    >
      <Text className={`text-primary text-16 capitalize`}>{item.label.replace("+", " ")}</Text>
    </View>
  );
};
export { DropdownItem };
