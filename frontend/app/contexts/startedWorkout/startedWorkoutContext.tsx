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
import moment from "moment";

interface StartedWorkoutContextProps {
  children: React.ReactNode;
}

interface StartedWorkoutContext {
  startedWorkout: Workout | null;
  startedExercise: string;
  setStartedExercise: Dispatch<SetStateAction<string>>;
  setStartedWorkout: Dispatch<SetStateAction<Workout | null>>;
  progress: any;
  startExercise: (id: string) => void;
  handleProgress: (item: any, payload?: any) => void;
  startTime?: number | undefined;
  setStartTime: Dispatch<SetStateAction<number | undefined>>;
}

export const StartedWorkoutContext = createContext<StartedWorkoutContext>({
  startedExercise: "",
  startedWorkout: null,
  setStartedExercise: () => {},
  setStartedWorkout: () => {},
  progress: {},
  startExercise: () => {},
  handleProgress: () => {},
  startTime: undefined,
  setStartTime: () => {},
});

const StartedWorkoutManager: React.FC<StartedWorkoutContextProps> = ({ children }) => {
  const [startedWorkout, setStartedWorkout] = useState<Workout | null>(null);
  const [startedExercise, setStartedExercise] = useState<string>("");
  const [progress, setProgress] = useState<any>({});
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const startExercise = (_id: string) => {
    setStartedExercise(_id);
    setProgress((prev: any) => {
      const newProgress = { ...prev };
      newProgress[_id] = {
        ...newProgress[_id],
        started: true,
        startTime: moment(),
      };
      return newProgress;
    });
  };

  useEffect(() => {
    setProgress(parseWorkouts(startedWorkout ?? {}));
  }, [startedWorkout]);

  const handleProgress = (item: any, payload: any) => {
    setProgress((prev: any) => {
      const newProgress = { ...prev };

      if (item?.category === Categories.Cardio) {
        console.log("payload", payload);
        newProgress[item._id] = {
          ...newProgress[item._id],
          finished: true,
          started: false,
          distance: payload?.distance,
          time: payload?.time,
        };
      }

      if (item?.category === Categories.Strength) {
        newProgress[item._id] = {
          ...newProgress[item._id],
          finished: true,
          started: false,
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

  console.log("progress", progress);

  const values: StartedWorkoutContext = useMemo(() => {
    return {
      progress,
      startedWorkout,
      setStartedWorkout,
      startedExercise,
      setStartedExercise,
      handleProgress,
      startExercise,
      startTime,
      setStartTime,
    };
  }, [startedWorkout, startedExercise, progress, startTime]);

  return <StartedWorkoutContext.Provider value={values}>{children}</StartedWorkoutContext.Provider>;
};

export default StartedWorkoutManager;
