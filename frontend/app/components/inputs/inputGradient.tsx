import { LinearGradient } from "expo-linear-gradient";
import colors from "constants/colors";
import FlatlistComponent from "components/flatlist/flatlist";

interface Props {
  children: React.ReactNode;
}

const InputGradient: React.FC<Props> = ({ children }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0 }}
      colors={colors.inputGradient}
      className="h-[48px]  pl-[18px] pr-[13px] rounded-[12px] flex flex-row items-center justify-between"
    >
      {children}
    </LinearGradient>
  );
};
export default InputGradient;
