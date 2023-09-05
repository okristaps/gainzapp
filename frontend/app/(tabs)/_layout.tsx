import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import {
  useColorScheme,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useContext } from "react";
import AuthManager, { AuthContext } from "../../auth/authManager";
import LoginForm from "../components/loginform/loginform";
import AppleLogo from "../../assets/icons/apple_logo.svg";
import GoogleLogo from "../../assets/icons/google_logo.svg";
import FacebookLogo from "../../assets/icons/facebook_logo.svg";
import ProfileLogo from "../../assets/icons/profile_logo.svg";
import Colors from "../constants/Colors";

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

      <View style={styles.lineContainer}>
        <LinearGradient
          colors={["transparent", "#D9D9D9"]}
          style={styles.gradient}
          start={[0.1, 0]}
        />
        <Text style={styles.smallTxtLogin}>Or continue with</Text>
        <LinearGradient
          colors={["#D9D9D9", "transparent"]}
          style={styles.gradient}
          end={[0.9, 0]}
        />
      </View>

      <View style={styles.otherLoginContainer}>
        <TouchableOpacity style={styles.otherLoginBtn}>
          <AppleLogo style={styles.appleLogo}></AppleLogo>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otherLoginBtn}>
          <GoogleLogo></GoogleLogo>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otherLoginBtn}>
          <FacebookLogo style={styles.facebookLogo}></FacebookLogo>
        </TouchableOpacity>
      </View>

      <View style={styles.smallTxtContainer}>
        <Text style={styles.smallTxtLogin}>Don't Have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.smallTxtButton}>Register here</Text>
        </TouchableOpacity>
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
  lineContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: 20,
    flexDirection: "row",
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
  appleLogo: {
    marginTop: 3,
  },
  facebookLogo: {
    marginTop: 6,
    marginLeft: 1,
  },
  smallTxtButton: {
    fontFamily: "IstokWeb",
    color: "#88BB46",
    marginTop: 5,
  },
  gradient: {
    marginHorizontal: 10,
    width: 90,
    height: 1,
  },
  logo: {
    // width: "80%",
    // height: "80%",
  },
});
