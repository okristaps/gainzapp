import { FormType } from "./types";

export const loginMethods: string[] = ["google", "apple", "facebook"];

export const getAnimationType = (type: string) => {
  if (type === FormType.RESET) {
    return "fadeIn";
  } else if (type === FormType.REG) {
    return "slideInRight";
  } else {
    return "slideInLeft";
  }
};
