import { AuthContext } from "auth/authManager";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useState } from "react";
import { Button, Text } from "react-native";

import Header from "components/header";
import Wrapper from "../components/layout/wrapper";
export default function Dashboard() {
  const [token, setToken] = useState("");

  const { logOut, user } = useContext(AuthContext);
  const logOutFunc = async () => {
    await logOut();
  };

  async function getToken() {
    const tok = await SecureStore.getItemAsync("userSession");
  }

  return (
    <Wrapper>
      <Header title="Week 25" justify="center" />
      <Button title="Get token" onPress={getToken} />
      <Button title="Log out" onPress={logOutFunc} />
      <Text> Token: {token} </Text>
    </Wrapper>
  );
}
