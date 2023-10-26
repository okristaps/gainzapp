import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="workoutInfo" options={{ headerShown: false }} />
      <Stack.Screen name="exercisesSelect" options={{ headerShown: false }} />
      <Stack.Screen name="workoutCreate" options={{ headerShown: false }} />
    </Stack>
  );
}