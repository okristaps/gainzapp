import React, { useContext } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../../auth/authManager";

interface LoginFormProps {
  // onLogin: (email: string, password: string) => void;
}

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = () => {
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
      console.log("aaaa");
      await signIn(email, password);
    } catch (error) {
      console.log("Sign in failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userText}>Username</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="email"
        rules={{
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        }}
        defaultValue=""
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.userText}>Password</Text>
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
        defaultValue=""
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassButton}>Forgot Password?</Text>
      </TouchableOpacity>
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <View style={styles.loginContainer}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={styles.loginBtnText}>Sign In</Text>
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
  loginBtnText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontFamily: "IstokWeb",
  },
  input: {
    height: 50,
    backgroundColor: "#282C30",
    fontFamily: "IstokWeb",
    color: "white",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  forgotPassButton: {
    textAlign: "right",
    fontFamily: "IstokWeb",
    color: "#A4A4A4",
    marginRight: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginForm;
