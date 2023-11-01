import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import ModalHeader from "components/modals/components/modalHeader";

interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title?: string;
  children?: React.ReactNode;
  onModalHide?: () => void;
  disableSwipe?: boolean;
}

const ModalWrapper: React.FC<ModalProps> = ({
  visible,
  setVisible,
  title,
  children,
  onModalHide,
  disableSwipe,
}) => {
  return (
    <Modal
      isVisible={visible}
      hasBackdrop={true}
      backdropOpacity={0.94}
      style={{ margin: 0, marginTop: "15%" }}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection={disableSwipe ? undefined : "down"}
      onModalHide={onModalHide}
      swipeThreshold={100}
      avoidKeyboard={true}
    >
      <View className="flex-1 justify-end">
        <View
          className={`pl-[23px] pr-[23px] pt-[23px] pb-[40px] rounded-tl-[20px] rounded-tr-[20px] bg-default`}
        >
          <ModalHeader
            text={title}
            onClosePress={() => {
              setVisible(false);
            }}
          />
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalWrapper;
