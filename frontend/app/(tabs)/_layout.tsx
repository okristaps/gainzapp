import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import {
  useColorScheme,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import React, { useContext } from "react";
import AuthManager, { AuthContext } from "../../auth/authManager";
import LoginForm from "../components/loginform/loginform";
import Colors from "../constants/Colors";
import AppleLogo from "../../assets/icons/apple_logo.svg";
import { SvgUri } from "react-native-svg";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useContext(AuthContext);

  console.log("user", user);

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Gainzapp</Text>
      </View>
      <AuthManager>
        {!user ? (
          <LoginForm />
        ) : (
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            }}
          >
            <Tabs.Screen
              name="two"
              options={{
                title: "Tab Two",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="code" color={color} />
                ),
              }}
            />
          </Tabs>
        )}
      </AuthManager>

      <View style={styles.smallTxtContainer}>
        <Text style={styles.smallTxtLogin}>Or continue with</Text>
      </View>

      <View style={styles.otherLoginContainer}>
        <TouchableOpacity style={styles.otherLoginBtn}>
          <SvgUri
            uri={require("../../assets/icons/apple_logo.svg").default}
            width={20}
            height={20}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.otherLoginBtn}>
          <SvgUri
            uri={require("../../assets/icons/apple_logo.svg").default}
            width={20}
            height={20}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.otherLoginBtn}></TouchableOpacity>
      </View>

      <View style={styles.smallTxtContainer}>
        <Text style={styles.smallTxtLogin}>Don't Have an account?</Text>
        <Text style={styles.smallTxtLogin}>Register here</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 34,
    color: "white",
    textAlign: "center",
    fontFamily: "IstokWebBold",
  },
  smallTxtContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: 20,
  },
  otherLoginContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    flexDirection: "row",
    marginTop: 10,
  },
  otherLoginBtn: {
    backgroundColor: "#282C30",
    width: 48,
    height: 48,
    borderRadius: 12,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  smallTxtLogin: {
    fontFamily: "IstokWeb",
    color: "#A4A4A4",
    marginTop: 5,
  },
  logo: {
    // width: "80%",
    // height: "80%",
  },
});
