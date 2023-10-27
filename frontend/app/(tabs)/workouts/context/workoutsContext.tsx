import React, { createContext, useCallback, useMemo, useState } from "react";

interface AuthManagerProps {
  children: React.ReactNode;
}

interface exerciseId {
  _id: string;
  name: string;
}

interface WorkoutContext {
  selectedExercises: exerciseId[];
  handleExercises: (exercise: exerciseId) => void;
}

export const WorkoutsContext = createContext<WorkoutContext>({
  selectedExercises: [],

  handleExercises: () => {},
});

const WorkoutManager: React.FC<AuthManagerProps> = ({ children }) => {
  const [selectedExercises, setSelectedExercises] = useState<exerciseId[]>([]);

  const handleExercises = useCallback(
    (exercise: exerciseId) => {
      console.log("exercise", exercise);
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
    };
  }, [selectedExercises]);

  return <WorkoutsContext.Provider value={values}>{children}</WorkoutsContext.Provider>;
};

export default WorkoutManager;
