import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import AuthManager, { AuthContext } from "auth/authManager";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  AppState,
  AppStateStatus,
  Easing,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import StartedWorkoutManager from "./contexts/startedWorkout/startedWorkoutContext";

import { Image } from "expo-image";
import { Text } from "react-native";
import Splash from "components/splash/splash";
export { ErrorBoundary } from "expo-router";
SplashScreen.preventAutoHideAsync().catch(() => {});

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

  return (
    <AuthManager>
      <RootLayoutNav loaded={loaded} error={error} />
    </AuthManager>
  );
}
const queryClient = new QueryClient();

function RootLayoutNav({ loaded, error }: { loaded: boolean; error?: Error | null }) {
  const { loading } = useContext(AuthContext);
  const [appIsReady, setAppIsReady] = useState(false);
  console.log("loading", loading);
  useEffect(() => {
    if (loaded && !loading) {
      setTimeout(() => {
        SplashScreen.hideAsync();
        setAppIsReady(true);
      });
    }
  }, [loaded, error, loading]);

  if (!appIsReady) {
    return <Splash />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StartedWorkoutManager>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "#212121",
              },
            }}
          />
        </Stack>
      </StartedWorkoutManager>
    </QueryClientProvider>
  );
}
