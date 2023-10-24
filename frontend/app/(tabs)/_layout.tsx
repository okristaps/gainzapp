import { AuthContext } from "auth/authManager";
import LoginForm from "components/loginform/loginform";
import ConfirmEmailModal from "components/modals/confirmEmailModal";
import { Tabs } from "expo-router";
import React, { useContext, useEffect } from "react";
import { tabs } from "./helpers/tabs";
import { getAuth } from "firebase/auth";

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
  const { userData } = useContext(AuthContext);
  const auth = getAuth();
  const user = auth.currentUser;

  if (!userData) {
    return <LoginForm />;
  }

  return (
    <>
      <NavTabs />
      {!user?.emailVerified && <ConfirmEmailModal user={user} auth={auth} />}
    </>
  );
}
