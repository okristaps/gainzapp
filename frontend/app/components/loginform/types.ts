export enum FormType {
  REG = "REG",
  LOGIN = "LOGIN",
}

export interface FormData {
  email: string;
  password: string;
}

export interface DividerProps {
  text: string;
}

export interface OtherMetProps {
  type: string;
}

export interface RegisterProps extends OtherMetProps {
  setType: (type: string) => void;
}
