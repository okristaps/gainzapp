import { ADMIN_PASSWORD, ADMIN_USERNAME } from "@env";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../../../auth/authManager";
interface LoginFormProps {}

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const isDevelopment = __DEV__;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { signIn } = useContext(AuthContext);
  const onSubmit = (data: FormData) => {
    handleSignIn(data.email, data.password);
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.log("Sign in failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="email"
        rules={{
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        }}
        defaultValue={isDevelopment ? ADMIN_USERNAME ?? "" : ""}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
        name="password"
        rules={{ required: "Password is required" }}
        defaultValue={isDevelopment ? ADMIN_PASSWORD ?? "" : ""}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    color: "white",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginForm;
