import ModalWrapper from "components/modals/components/modalWrapper";
import React from "react";
import { Text } from "react-native";

interface ModalProps {
  visible: boolean;
  setVisible?: (visible: boolean) => void;
}

const FiltersModal: React.FC<ModalProps> = ({ visible, setVisible }) => {
  return (
    <ModalWrapper visible={visible} setVisible={setVisible} title={"Filters"}>
      <Text> Filters modal </Text>
    </ModalWrapper>
  );
};

export default FiltersModal;
