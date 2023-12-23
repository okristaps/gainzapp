import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import AuthManager, { AuthContext } from "auth/authManager";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useContext, useEffect, useState } from "react";
import { AppState, AppStateStatus, Platform, View } from "react-native";
import StartedWorkoutManager from "./contexts/startedWorkout/startedWorkoutContext";
import GeneralContexManager from "./contexts/generalContext";

export { ErrorBoundary } from "expo-router";
SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();
      setAppIsReady(true);
    }
  }, [loaded, error, loading]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StartedWorkoutManager>
        <GeneralContexManager>
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
        </GeneralContexManager>
      </StartedWorkoutManager>
    </QueryClientProvider>
  );
}
