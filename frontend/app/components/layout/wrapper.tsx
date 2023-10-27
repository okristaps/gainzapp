import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#000000", "transparent"]}
        style={{ flex: 1, backgroundColor: "#1E1E1E", opacity: 0.9 }}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 2 }}
      >
        <SafeAreaView className="flex-1 align-center pl-[23px] pr-[23px]  font-isotok">
          {children}
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default Wrapper;
