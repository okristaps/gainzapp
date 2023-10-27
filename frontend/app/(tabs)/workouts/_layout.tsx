import ExerciseModal from "components/modals/exerciseModal/exerciseModal";
import { Stack } from "expo-router";
import WorkoutManager from "./context/workoutsContext";

export default function Layout() {
  return (
    <WorkoutManager>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="workoutInfo" options={{ headerShown: false }} />
        <Stack.Screen name="exercisesSelect" options={{ headerShown: false }} />
        <Stack.Screen name="workoutCreate" options={{ headerShown: false }} />
      </Stack>
    </WorkoutManager>
  );
}
