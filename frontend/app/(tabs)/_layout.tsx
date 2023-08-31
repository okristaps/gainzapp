import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { AuthContext } from "../../auth/authManager";
import "../../src/global.css";
import ConfirmEmailModal from "../components/confirmEmailModal";
import LoginForm from "../components/loginform/loginform";
import { tabs } from "./helpers/tabs";
// import Dashboard from "../../src/assets/dashboard.svg";
import { View } from "../components/Themed";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <View>
      <Dashboard />
    </View>
  );
}

const NavTabs = () => {
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarStyle: { backgroundColor: "#1E0000" },
            tabBarActiveTintColor: "#88BB46",
            title: tab.title,
            // tabBarIcon: ({ color }) => <TabBarIcon icon={tab.icon} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
};

export default function TabLayout() {
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
