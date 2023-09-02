import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <LinearGradient
      colors={["#000000", "transparent"]}
      style={{ flex: 1, backgroundColor: "#1E1E1E", opacity: 0.9 }}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 2 }}
    >
      <SafeAreaView className="flex-1 align-center pl-[23px] pr-[23px] pb-[40px] font-isotok">
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Wrapper;
