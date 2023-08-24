import { ADMIN_PASSWORD, ADMIN_USERNAME } from "@env";
import React, { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, StyleSheet, View } from "react-native";
import { AuthContext } from "../../../auth/authManager";
import { Input } from "../../../components/formInput";

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
    formState: { errors, isValid },
  } = useForm<FormData>();

  const isDevelopment = __DEV__;
  const [type, setType] = useState(FormType.LOGIN);
  const { signIn, signUp } = useContext(AuthContext);

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        switch (type) {
          case FormType.LOGIN:
            await signIn(data.email, data.password);
            break;
          case FormType.REG:
            await signUp(data.email, data.password);
            break;
        }
      } catch (error) {
        console.error("Error logging / registering ", error?.message);
      }
    },
    [getValues, type, isValid, errors]
  );

  return (
    <View style={styles.container}>
      <Input
        name={"email"}
        control={control}
        errors={errors}
        rules={{
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        }}
        defaultValue={"assad@asd.com"}
        placeholder={"Email"}
      />

      <Input
        name={"password"}
        control={control}
        errors={errors}
        rules={{ required: "Password is required" }}
        placeholder={"Password"}
        defaultValue={"assad@asd.com"}
      />

      <Button
        title={`${type === FormType.LOGIN ? "Sign in" : "Register"}`}
        onPress={handleSubmit(onSubmit)}
      />
      <View style={{ marginTop: 50 }}>
        <Button
          title={`${type === FormType.REG ? "Back to Sign in" : "Register"}`}
          onPress={() => setType(type === FormType.REG ? FormType.LOGIN : FormType.REG)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default LoginForm;
