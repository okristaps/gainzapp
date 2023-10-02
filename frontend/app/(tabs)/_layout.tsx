import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { AuthContext } from "auth/authManager";
import ConfirmEmailModal from "components/modals/confirmEmailModal";
import LoginForm from "components/loginform/loginform";
import { tabs } from "./helpers/tabs";

const NavTabs = () => {
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarStyle: { backgroundColor: "#1E0000", borderTopWidth: 0 },
            tabBarActiveTintColor: "#88BB46",
            tabBarInactiveTintColor: "#FFFFFF",
            headerShown: false,
            title: tab.title,
            tabBarIcon: ({ color }) => <tab.icon stroke={color} />,
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
