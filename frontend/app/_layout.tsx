import FontAwesome from "@expo/vector-icons/FontAwesome";
import AuthManager from "auth/authManager";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Isotok: require("../src/assets/fonts/IstokWeb-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* {!loaded && <SplashScreen />} */}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  return (
    <AuthManager>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthManager>
  );
}
