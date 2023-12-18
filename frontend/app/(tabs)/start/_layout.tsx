import { Stack } from "expo-router";
import WorkoutManager from "../../contexts/workoutsContext";

const screens = ["index", "workoutInfo", "startedwo"];

export default function Layout() {
  return (
    <WorkoutManager>
      <Stack>
        {screens.map((screen) => (
          <Stack.Screen
            key={screen}
            name={screen}
            options={{
              headerShown: false,
              gestureEnabled: screen === "workoutInfo",
              contentStyle: {
                backgroundColor: "#212121",
                paddingHorizontal: 20,
              },
            }}
          />
        ))}
      </Stack>
    </WorkoutManager>
  );
}
