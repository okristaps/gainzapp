import { AuthContext } from "auth/authManager";
import Wrapper from "components/layout/wrapper";
import LoginForm from "components/loginform/loginform";
import ConfirmEmailModal from "components/modals/confirmEmailModal";
import { Tabs } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useContext } from "react";
import { tabs } from "./helpers/tabs";

const NavTabs = () => {
  return (
    <Tabs sceneContainerStyle={{ backgroundColor: "none" }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarStyle: {
              backgroundColor: "transparent",
              // paddingTop: 20,
              height: 55,
              paddingBottom: 0,
              borderTopWidth: 0,
            },
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
    <Wrapper>
      <NavTabs />
      {!user?.emailVerified && <ConfirmEmailModal user={user} auth={auth} />}
    </Wrapper>
  );
}
