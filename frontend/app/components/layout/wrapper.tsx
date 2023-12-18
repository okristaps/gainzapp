import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ backgroundColor: "#212121" }} className="flex-1 font-isotok">
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Wrapper;
