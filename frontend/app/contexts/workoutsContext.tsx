import { deleteBe, postBe, putBe } from "api/index";
import { AuthContext } from "auth/authManager";
import { exerciseId } from "components/loginform/types";
import { useNavigation } from "expo-router";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Workout } from "types/index";

interface AuthManagerProps {
  children: React.ReactNode;
}

interface WorkoutContext {
  selectedWorkout: Workout | null;
  selectedExercises: exerciseId[];
  handleExercises: (exercise: exerciseId) => void;
  setSelectedWorkout: React.Dispatch<React.SetStateAction<Workout | null>>;
  setSelectedExercises: React.Dispatch<React.SetStateAction<exerciseId[]>>;
  resetData: () => void;
  createWorkout: (name: string, _id?: string) => Promise<any>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  deleteWorkout: () => Promise<any>;
}

const initalWorkout = {
  _id: "",

  description: [],
  forces: [],
  equipment: [],
  instructions: [],
  exercises: [],
};

export const WorkoutsContext = createContext<WorkoutContext>({
  selectedExercises: [],
  selectedWorkout: initalWorkout,
  setSelectedWorkout: () => {},
  setSelectedExercises: () => {},
  handleExercises: () => {},
  resetData: () => {},
  createWorkout: async () => {},
  deleteWorkout: async () => {},
});

const WorkoutManager: React.FC<AuthManagerProps> = ({ children }) => {
  const { userData } = useContext(AuthContext);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(initalWorkout);

  const [selectedExercises, setSelectedExercises] = useState<exerciseId[]>([]);

  const handleExercises = useCallback(
    (exercise: exerciseId) => {
      setSelectedExercises((curr) => {
        if (curr.some((ex) => ex._id === exercise._id)) {
          return curr.filter((ex) => ex._id !== exercise._id);
        } else {
          return [{ name: exercise.name, _id: exercise._id }, ...curr];
        }
      });
    },
    [selectedExercises]
  );

  const createWorkout = async (name: string, _id?: string) => {
    const body = {
      ...selectedWorkout,
      exercises: selectedExercises,
      uid: userData?.uid,
      name,
    };
    !_id
      ? await putBe({
          path: "/workouts",
          body,
        })
      : await postBe({
          path: `/workouts/${_id}`,
          body,
        });
  };

  const deleteWorkout = async () => await deleteBe({ path: `/workouts/${selectedWorkout?._id}` });

  const resetData = () => {
    setSelectedExercises([]);
    setSelectedWorkout(initalWorkout);
  };

  const values: WorkoutContext = useMemo(() => {
    return {
      selectedExercises,
      handleExercises,
      setSelectedExercises,
      selectedWorkout,
      setSelectedWorkout,
      resetData,
      createWorkout,

      deleteWorkout,
    };
  }, [selectedExercises, selectedWorkout]);

  return <WorkoutsContext.Provider value={values}>{children}</WorkoutsContext.Provider>;
};

export default WorkoutManager;
