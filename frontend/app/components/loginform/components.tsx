import colors from "constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { loginMethods } from "./helpers";
import { DividerProps, FormType, OtherMetProps, RegisterProps } from "./types";

import Apple from "assets/images/apple.svg";
import DividerSVG from "assets/images/divider.svg";
import Facebook from "assets/images/fb.svg";
import Google from "assets/images/google.svg";

interface Props {
  type: string;
  onPress?: () => void;
}

const OtherBtn: React.FC<Props> = ({ onPress, type }) => {
  return (
    <TouchableOpacity className="h-[48px] w-[48px]" onPress={onPress}>
      <LinearGradient
        className="flex-1  bg-input border border-white rounded-[12px] flex justify-center items-center  "
        colors={colors.inputGradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        {type === "google" && <Google />}
        {type === "facebook" && <Facebook />}
        {type === "apple" && <Apple />}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const Divider: React.FC<DividerProps> = ({ text, textSize, extraClassName }) => {
  const arrowWidth = Dimensions.get("window").width / 5;
  return (
    <View className={`flex flex-row items-center  justify-center ${extraClassName}`}>
      <View className="rotate-180">
        <DividerSVG width={arrowWidth} />
      </View>
      <Text className={`font-regular text-white text-[${textSize ?? "11px"}] px-[7px]`}>
        {text}{" "}
      </Text>
      <DividerSVG width={arrowWidth} />
    </View>
  );
};

const OtherMethods: React.FC<OtherMetProps> = ({ type }) => {
  return (
    <View className="flex w-100% items-center">
      <Divider
        extraClassName={"mt-[22px]"}
        text={type === FormType.REG ? " Or register with" : "Or sign in with"}
      />
      <View className="mt-[20px] flex flex-row w-[202px] justify-between ">
        {loginMethods.map((type: string) => (
          <OtherBtn type={type} key={type} />
        ))}
      </View>
    </View>
  );
};

const Register: React.FC<RegisterProps> = ({ setType, type }) => {
  return (
    <View className="flex mt-[30px]">
      <Text className="text-center text-input">
        {`${type === FormType.REG ? "Already have an account?" : "Don’t have an account?  "}`}{" "}
      </Text>
      <TouchableOpacity
        className="mt-[4px]"
        onPress={() => setType(type === FormType.REG ? FormType.LOGIN : FormType.REG)}
      >
        <Text className="text-center text-success text-12 font-medium">
          {`${type === FormType.REG ? "Back to sign in" : "Register"}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ForgotPassword = ({ onPress }) => {
  return (
    <View className="flex-row items-end justify-end mt-[16px] mb-[22px]">
      <TouchableOpacity onPress={onPress}>
        <Text className="text-base text-input">Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export { Divider, ForgotPassword, OtherBtn, OtherMethods, Register };
