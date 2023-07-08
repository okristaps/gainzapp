import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import { useContext } from "react";
import AuthManager, { AuthContext } from "../../auth/authManager";
import LoginForm from "../components/loginform/loginform";
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

  console.log("user", user);

  if (!user) {
    return (
      <AuthManager>
        <LoginForm />
      </AuthManager>
    );
  }

  return (
    <AuthManager>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        }}
      >
        <Tabs.Screen
          name="two"
          options={{
            title: "Tab Two",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    </AuthManager>
  );
}
