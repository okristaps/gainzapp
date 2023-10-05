import colors from "constants/colors";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  children: React.ReactNode;
  extraClassName?: string;
}

const InputGradient: React.FC<Props> = ({ children, extraClassName }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0 }}
      colors={colors.inputGradient}
      className={`h-[48px]  pl-[18px] pr-[13px] rounded-[12px] flex flex-row items-center justify-between ${extraClassName}`}
    >
      {children}
    </LinearGradient>
  );
};
export default InputGradient;
