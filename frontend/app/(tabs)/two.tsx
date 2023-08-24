import React, { useContext, useState } from "react";
import { Button, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "../components/Themed";
import { AuthContext } from "../../auth/authManager";

export default function TabTwoScreen() {
  const [token, setToken] = useState("");

  const { logOut, user } = useContext(AuthContext);
  const logOutFunc = async () => {
    await logOut();
  };

  console.log("user", user);

  async function getToken() {
    const tok = await SecureStore.getItemAsync("userSession");
    console.log("tok", tok);
  }

  return (
    <View style={styles.container}>
      <Button title="Get token" onPress={getToken} />
      <Button title="Log out" onPress={logOutFunc} />
      <Text> Token: {token} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
