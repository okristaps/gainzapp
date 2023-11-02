import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import AuthManager from "auth/authManager";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import ExerciseModalManager from "./contexts/exerciseModalContext";
export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Isotok: require("../src/assets/fonts/IstokWeb-Regular.ttf"),
    ...FontAwesome.font,
  });

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

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
const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <AuthManager>
      <QueryClientProvider client={queryClient}>
        <ExerciseModalManager>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ExerciseModalManager>
      </QueryClientProvider>
    </AuthManager>
  );
}
