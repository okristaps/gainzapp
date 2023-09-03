import { AuthContext } from "auth/authManager";
import { PirmaryButton } from "components/common/primarybutton";
import { Input } from "components/inputs/formInput";
import Wrapper from "components/layout/wrapper";
import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { ForgotPassword, OtherMethods, Register } from "./components";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { signIn, signUp } = useContext(AuthContext);

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
      <View className="mb-[10px]">
        <Input
          type="emailAddress"
          showTitle={true}
          name={"email"}
          control={control}
          errors={errors}
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          }}
          placeholder={"Email"}
        />
      </View>
      <Input
        showTitle={true}
        name={"password"}
        type={"password"}
        control={control}
        errors={errors}
        rules={{ required: "Password is required" }}
        placeholder={"Password"}
      />
      {type === FormType.REG && (
        <Animatable.View
          className="mt-[10px] mb-[30px]"
          duration={700}
          animation={type === FormType.REG ? "fadeInRight" : "slideInRight"}
        >
          <Input
            showTitle={true}
            name={"confirmPassword"}
            type={"password"}
            control={control}
            errors={errors}
            rules={{
              required: "Confirm password is required",
              validate: (value: string) => value === password || "Passwords do not match",
            }}
            placeholder={"Confirm password"}
          />
        </Animatable.View>
      )}
      {Boolean(error) && <Text className="text-primary  text-danger mt-[10px]">{error}</Text>}
      {type === FormType.LOGIN && (
        <Animatable.View duration={2000} animation={"bounceInRight"}>
          <ForgotPassword />
        </Animatable.View>
      )}
      <Animatable.View animation={type === FormType.REG ? "slideInLeft" : "slideInRight"}>
        <PirmaryButton
          loading={loading}
          text={`${type === FormType.LOGIN ? "Sign in" : "Register"}`}
          onPress={handleSubmit(onSubmit)}
        />
        <OtherMethods type={type} />
      </Animatable.View>
      <Animatable.View animation={type === FormType.REG ? "slideInRight" : "slideInLeft"}>
        <Register type={type} setType={setType} />
      </Animatable.View>
    </Wrapper>
  );
};

export default LoginForm;
