export enum FormType {
  REG = "REG",
  LOGIN = "LOGIN",
  RESET = "RESET",
}

export interface FormData {
  email: string;
  password: string;
}

export interface DividerProps {
  text: string;
  textSize?: number;
  extraClassName?: string;
}

export interface OtherMetProps {
  type: string;
  onPress?: (type: string) => void;
}

export interface RegisterProps extends OtherMetProps {
  setType: (type: string) => void;
}
