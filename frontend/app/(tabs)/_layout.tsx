import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { useColorScheme } from "react-native";
import { AuthContext } from "../../auth/authManager";
import LoginForm from "../components/loginform/loginform";
import ConfirmEmailModal from "../components/confirmEmailModal";
import { tabs } from "./helpers/tabs";
import { Text, View } from "../components/Themed";
import Loader from "../components/loader/loader";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const NavTabs = () => {
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => <TabBarIcon name={tab?.icon} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useContext(AuthContext);

  if (!user) {
    return <LoginForm />;
  }

  return (
    <>
      <NavTabs />
      {!user?.emailVerified && <ConfirmEmailModal user={user} />}
    </>
  );
}
