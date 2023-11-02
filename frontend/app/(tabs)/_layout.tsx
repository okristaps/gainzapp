import { AuthContext } from "auth/authManager";
import LoginForm from "components/loginform/loginform";
import ConfirmEmailModal from "components/modals/confirmEmailModal";
import { Tabs } from "expo-router";
import React, { memo, useContext, useEffect } from "react";
import { tabs } from "./helpers/tabs";
import { getAuth } from "firebase/auth";
import { ExerciseModalContext } from "../contexts/exerciseModalContext";
import ExerciseModal from "components/modals/exerciseModal/exerciseModal";
import { Exercise, ExerciseIdentifier } from "types/index";

const NavTabs = () => {
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarStyle: { backgroundColor: "#1E0000", borderTopWidth: 0 },
            tabBarActiveTintColor: "#88BB46",
            tabBarInactiveTintColor: "#FFFFFF",
            headerShown: false,
            title: tab.title,
            tabBarIcon: ({ color }) => <tab.icon stroke={color} />,
          }}
        />
      ))}
    </Tabs>
  );
};

export default function TabLayout() {
  const { exercise, setExercise, exercisesLoading } = useContext(ExerciseModalContext);
  const { userData } = useContext(AuthContext);
  const auth = getAuth();
  const user = auth.currentUser;

  if (!userData) {
    return <LoginForm />;
  }

  return (
    <>
      <ModalSuff
        exercise={exercise}
        exercisesLoading={exercisesLoading}
        setExercise={setExercise}
      />
      <NavTabs />
      {!user?.emailVerified && <ConfirmEmailModal user={user} auth={auth} />}
    </>
  );
}

const ModalSuff = memo(
  ({
    exercise,
    exercisesLoading,
    setExercise,
  }: {
    exercise: Exercise | ExerciseIdentifier;
    exercisesLoading: boolean;
    setExercise: React.Dispatch<React.SetStateAction<Exercise | ExerciseIdentifier | null>>;
  }) => {
    return (
      <ExerciseModal
        visible={Boolean(exercise)}
        setVisible={() => setExercise(null)}
        exercise={exercise}
        isLoading={exercisesLoading}
        id
      />
    );
  }
);
