import { Stack } from "expo-router";

const screens = ["index", "pastWorkouts", "viewPastWorkout", "exerciseProgress"];

export default function Layout() {
  return (
    <Stack>
      {screens.map((screen) => (
        <Stack.Screen
          key={screen}
          name={screen}
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#212121",
              paddingHorizontal: 20,
            },
          }}
        />
      ))}
    </Stack>
  );
}
