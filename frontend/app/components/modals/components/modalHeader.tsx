import { TouchableOpacity, View } from "react-native";

import Arrow from "assets/images/arrow.svg";
import Close from "assets/images/close.svg";
import { Divider } from "../../loginform/components";

interface Props {
  onBackPress?: () => void;
  onClosePress: () => void;
  showBack?: boolean;
}

const ModalHeader: React.FC<Props> = ({ showBack, onBackPress, onClosePress }) => {
  return (
    <View className="flex width-[100%] flex-row justify-between items-center">
      {showBack ? (
        <TouchableOpacity onPress={onBackPress}>
          <Arrow fill="#ffffff" />
        </TouchableOpacity>
      ) : (
        <View className="w-[24px] h-[24px]" />
      )}
      <Divider text="Reset password" textSize={28} />
      <TouchableOpacity onPress={onClosePress}>
        <Close fill="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

export default ModalHeader;
