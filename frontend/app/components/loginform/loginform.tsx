import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View, Text } from "react-native";
import { AuthContext } from "../../../auth/authManager";
import { Input } from "../../../components/formInput";
import { PirmaryButton } from "../common/primarybutton";
import Wrapper from "../layout/wrapper";

interface FormData {
  email: string;
  password: string;
}

enum FormType {
  REG = "REG",
  LOGIN = "LOGIN",
}

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
      } catch (error) {
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

  return (
    <Wrapper>
      <Text className="mt-[40px]  text-title text-center text-white font-bold "> Gainzapp </Text>
      <Text className=" text-[22px] mt-[20px]  mb-[84px] font-medium text-center text-input">
        {`${type === FormType.LOGIN ? "Sign in" : "Register"}`}
      </Text>

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
        <View className="mt-[10px]">
          <Input
            showTitle={true}
            name={"confirmPassword"}
            type={"password"}
            control={control}
            errors={errors}
            rules={{
              required: "Confirm password is required",
              validate: (value) => value === password || "Passwords do not match",
            }}
            placeholder={"Confirm password"}
          />
        </View>
      )}
      {Boolean(error) && <Text className="text-primary  text-danger mt-[10px]">{error}</Text>}
      <ForgotPassword />

      <PirmaryButton
        loading={loading}
        text={`${type === FormType.LOGIN ? "Sign in" : "Register"}`}
        onPress={handleSubmit(onSubmit)}
      />
      <Register type={type} setType={setType} />
    </Wrapper>
  );
};

const Register = ({ setType, type }) => {
  return (
    <View className="flex mt-[30px]">
      <Text className="text-center text-input">
        {" "}
        {`${type === FormType.REG ? "Already have an account?" : "Don’t have an account?  "}`}{" "}
      </Text>
      <TouchableOpacity
        className="mt-[4px]"
        onPress={() => setType(type === FormType.REG ? FormType.LOGIN : FormType.REG)}
      >
        <Text className="text-center text-success text-12 font-medium">
          {`${type === FormType.REG ? "Back to Sign in" : "Register"}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ForgotPassword = () => {
  return (
    <View className="flex-row items-end justify-end mt-[16px] mb-[22px]">
      <TouchableOpacity>
        <Text className="text-base text-input">Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
