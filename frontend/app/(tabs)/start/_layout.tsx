import { Stack } from "expo-router";
import WorkoutManager from "../../contexts/workoutsContext";

export default function Layout() {
  return (
    <WorkoutManager>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="workoutInfo" options={{ headerShown: false }} />
      </Stack>
    </WorkoutManager>
  );
}
