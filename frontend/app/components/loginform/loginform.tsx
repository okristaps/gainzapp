import { ADMIN_PASSWORD, ADMIN_USERNAME } from "@env";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../../auth/authManager";
import { LinearGradient } from "expo-linear-gradient";
import ProfileLogo from "../../../assets/icons/profile_logo.svg";
import PasswordKeyLogo from "../../../assets/icons/password_key_logo.svg";
import CensoredPassLogo from "../../../assets/icons/censored_pass_logo.svg";
import UncensoredPassLogo from "../../../assets/icons/uncensored_pass_logo.svg";
interface LoginFormProps {}

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const isDevelopment = __DEV__;
  const [showPassword, setShowPassword] = useState(false);

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
      <Text style={styles.userText}>E-mail</Text>
      <View style={styles.inputContainer}>
        <ProfileLogo style={styles.profileLogo}></ProfileLogo>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textInput}
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
      </View>
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.userText}>Password</Text>
      <View style={styles.inputContainer}>
        <PasswordKeyLogo style={styles.passwordLogo}></PasswordKeyLogo>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="password"
          rules={{ required: "Password is required" }}
          defaultValue={isDevelopment ? ADMIN_PASSWORD ?? "" : ""}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {/* Toggle between the two icons based on showPassword state */}
          {showPassword ? <UncensoredPassLogo /> : <CensoredPassLogo />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassButton}>Forgot Password?</Text>
      </TouchableOpacity>
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <View style={styles.loginContainer}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <LinearGradient
            colors={["#88BB46", "#a7eb88"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginBtnBackground}
          >
            <Text style={styles.loginBtnText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  loginContainer: {
    justifyContent: "center",
    height: 50,
    width: "100%",
    borderRadius: 15,
    alignSelf: "center",
    backgroundColor: "#88BB46",
    marginTop: 20,
  },
  userText: {
    fontFamily: "IstokWeb",
    color: "#A4A4A4",
    marginBottom: 5,
    marginLeft: 5,
  },
  loginBtnBackground: {
    justifyContent: "center",
    height: 50,
    width: "100%",
    borderRadius: 15,
    alignSelf: "center",
  },
  loginBtnText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontFamily: "IstokWeb",
  },
  inputContainer: {
    flexDirection: "row", // Create a row layout
    alignItems: "center",
    height: 50,
    backgroundColor: "#282C30",
    fontFamily: "IstokWeb",
    color: "white",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 15,
  },
  textInput: {
    height: 46,
    width: 235,
    backgroundColor: "#282C30",
    fontFamily: "IstokWeb",
    color: "white",
    paddingHorizontal: 10,
  },
  forgotPassButton: {
    textAlign: "right",
    fontFamily: "IstokWeb",
    color: "#A4A4A4",
    marginRight: 5,
  },
  profileLogo: {
    marginLeft: 15,
    color: "#A4A4A4",
  },
  passwordLogo: {
    marginLeft: 12,
    color: "#A4A4A4",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginForm;
