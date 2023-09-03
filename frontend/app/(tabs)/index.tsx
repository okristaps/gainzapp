import { AuthContext } from "auth/authManager";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Wrapper from "../components/layout/wrapper";
export default function TabTwoScreen() {
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
      <View>
        <Text className="text-slate-800"> asdasdsa</Text>
      </View>
      <SafeAreaView>
        <Button title="Get token" onPress={getToken} />
        <Button title="Log out" onPress={logOutFunc} />
        <Text> Token: {token} </Text>
      </SafeAreaView>
    </Wrapper>
  );
}
