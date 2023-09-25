import { AuthContext } from "auth/authManager";
import { PirmaryButton } from "components/common/primarybutton";
import Wrapper from "components/layout/wrapper";
import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { ForgotPassword, OtherMethods, Register } from "./components";
import FormItems from "./formItems";
import ResetPasswordModal from "./resetModal";
import { FormData, FormType } from "./types";

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  // const isDevelopment = __DEV__;
  const [type, setType] = useState<string>(FormType.LOGIN);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { signIn, signUp, googleSignIn, signInWithFB } = useContext(AuthContext);

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true);
      try {
        type === FormType.LOGIN
          ? await signIn(data.email, data.password)
          : await signUp(data.email, data.password);
      } catch (error: any) {
        setError(error?.message);
      }
      setLoading(false);
    },

    [getValues, type, isValid, errors]
  );
  const password = watch("password", "");

  useEffect(() => {
    reset();
  }, [type]);

  const handleOtherMethods = (type: string) => {
    switch (type) {
      case "google":
        googleSignIn();
        break;
      case "facebook":
        signInWithFB();
        break;
      default:
        break;
    }
  };

  const Action = memo(() => {
    return (
      <Animatable.Text
        animation={"pulse"}
        className=" text-[22px] mt-[20px]  mb-[54px] font-medium text-center text-input"
      >
        {`${type === FormType.LOGIN ? "Sign in" : "Register"}`}
      </Animatable.Text>
    );
  });

  return (
    <Wrapper>
      <Text className="mt-[40px]  text-title text-center text-white font-bold "> Gainzapp </Text>
      <Action />
      <FormItems error={error} control={control} type={type} errors={errors} password={password} />
      {Boolean(error) && <Text className="text-primary  text-danger mt-[10px]">{error}</Text>}
      {type === FormType.LOGIN && (
        <Animatable.View duration={2000} animation={"bounceInRight"}>
          <ResetPasswordModal visible={visible} setVisible={setVisible} />
          <ForgotPassword onPress={() => setVisible(true)} />
        </Animatable.View>
      )}
      <Animatable.View animation={type === FormType.REG ? "slideInLeft" : "slideInRight"}>
        <PirmaryButton
          loading={loading}
          text={`${type === FormType.LOGIN ? "Sign in" : "Register"}`}
          onPress={handleSubmit(onSubmit)}
        />
        {/* <OtherMethods onPress={handleOtherMethods} type={type} /> */}
      </Animatable.View>
      <Animatable.View animation={type === FormType.REG ? "slideInRight" : "slideInLeft"}>
        <Register type={type} setType={setType} />
      </Animatable.View>
    </Wrapper>
  );
};

export default LoginForm;
