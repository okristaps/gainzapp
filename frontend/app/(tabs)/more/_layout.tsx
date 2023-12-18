import { AuthContext } from "auth/authManager";
import Wrapper from "components/layout/wrapper";
import React, { useContext } from "react";
import { Button, Text } from "react-native";

export default function TabMoreScreen() {
  const { logOut, user } = useContext(AuthContext);
  const logOutFunc = async () => {
    await logOut();
  };

  return (
    <>
      <Text className="text-white"> More </Text>
      <Button title="Log out" onPress={logOutFunc} />
    </>
  );
}
