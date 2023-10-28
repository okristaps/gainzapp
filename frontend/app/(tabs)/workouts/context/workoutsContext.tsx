import { exerciseId } from "components/loginform/types";
import React, { createContext, useCallback, useMemo, useState } from "react";
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
}

export const WorkoutsContext = createContext<WorkoutContext>({
  selectedExercises: [],
  selectedWorkout: null,
  setSelectedWorkout: () => {},
  setSelectedExercises: () => {},
  handleExercises: () => {},
});

const WorkoutManager: React.FC<AuthManagerProps> = ({ children }) => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<exerciseId[]>([]);

  const handleExercises = useCallback(
    (exercise: exerciseId) => {
      setSelectedExercises((curr) => {
        if (curr.some((ex) => ex._id === exercise._id)) {
          return curr.filter((ex) => ex._id !== exercise._id);
        } else {
          return [exercise, ...curr];
        }
      });
    },
    [selectedExercises]
  );

  const values: WorkoutContext = useMemo(() => {
    return {
      selectedExercises,
      handleExercises,
      setSelectedExercises,
      selectedWorkout,
      setSelectedWorkout,
    };
  }, [selectedExercises, selectedWorkout]);

  return <WorkoutsContext.Provider value={values}>{children}</WorkoutsContext.Provider>;
};

export default WorkoutManager;
