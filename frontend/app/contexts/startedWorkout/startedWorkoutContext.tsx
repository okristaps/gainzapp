import React, {
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Workout } from "types/index";
import { parseWorkouts } from "./helpers";
import { Categories } from "types/filters";

interface StartedWorkoutContextProps {
  children: React.ReactNode;
}

interface StartedWorkoutContext {
  startedWorkout: Workout | null;
  startedExercise: string;
  setStartedExercise: Dispatch<SetStateAction<string>>;
  setStartedWorkout: Dispatch<SetStateAction<Workout | null>>;
  progress: any;

  handleProgress: (item: any) => void;
}

export const StartedWorkoutContext = createContext<StartedWorkoutContext>({
  startedExercise: "",
  startedWorkout: null,
  setStartedExercise: () => {},
  setStartedWorkout: () => {},
  progress: {},

  handleProgress: () => {},
});

const StartedWorkoutManager: React.FC<StartedWorkoutContextProps> = ({ children }) => {
  const [startedWorkout, setStartedWorkout] = useState<Workout | null>(null);
  const [startedExercise, setStartedExercise] = useState<string>("");
  const [progress, setProgress] = useState<any>(parseWorkouts(startedWorkout ?? {}));

  const handleProgress = (item: any) => {
    setProgress((prev: any) => {
      const newProgress = { ...prev };

      if (item?.category === Categories.Cardio) {
        newProgress[item._id] = {
          ...newProgress[item._id],
          finished: true,
          distance: 1000,
          time: 1000,
        };
      }

      if (item?.category === Categories.Strength) {
        newProgress[item._id] = {
          ...newProgress[item._id],
          finished: true,
          sets: [
            {
              reps: 10,
              weight: 100,
            },
            {
              reps: 10,
              weight: 100,
            },
          ],
        };
      }

      return newProgress;
    });
    setStartedExercise("");
  };

  const values: StartedWorkoutContext = useMemo(() => {
    return {
      progress,
      startedWorkout,
      setStartedWorkout,
      startedExercise,
      setStartedExercise,
      handleProgress,
    };
  }, [startedWorkout, startedExercise, progress]);

  return <StartedWorkoutContext.Provider value={values}>{children}</StartedWorkoutContext.Provider>;
};

export default StartedWorkoutManager;
