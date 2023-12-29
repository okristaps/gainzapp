import { Stack } from "expo-router";

const screens = ["index", "profileInfo", "measurments"];

export default function Layout() {
  return (
    <Stack>
      {screens.map((screen) => (
        <Stack.Screen
          key={screen}
          name={screen}
          options={{
            headerShown: false,
            gestureEnabled: screen !== "exercisesSelect",
            contentStyle: {
              backgroundColor: "#212121",
              paddingLeft: 20,
              paddingRight: 20,
            },
          }}
        />
      ))}
    </Stack>
  );
}
