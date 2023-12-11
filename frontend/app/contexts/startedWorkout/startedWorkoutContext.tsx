import React, {
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
} from "react";
import { Workout } from "types/index";
import { router } from "expo-router";
import { parseWorkouts } from "./helpers";
import { Categories, reppedCategories, reppedWithoutWeightCategories } from "types/filters";
import moment from "moment";
import { putBe } from "api/index";
import { AuthContext } from "auth/authManager";

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
  loading?: boolean;
  completeWorkout: () => Promise<any>;
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
  loading: false,
  completeWorkout: async () => {},
});

const StartedWorkoutManager: React.FC<StartedWorkoutContextProps> = ({ children }) => {
  const { userData } = useContext(AuthContext);
  const [startedWorkout, setStartedWorkout] = useState<Workout | null>(null);
  const [startedExercise, setStartedExercise] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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

      newProgress[item._id] = {
        category: item?.category,
        equipment: item?.equipment,
        finished: true,
        started: false,
      };

      if (item?.category === Categories.Cardio) {
        newProgress[item._id] = {
          ...newProgress[item._id],
          distance: payload?.distance,
          time: payload?.time,
        };
      }

      if (
        reppedCategories.includes(item?.category) ||
        reppedWithoutWeightCategories.includes(item?.category)
      ) {
        newProgress[item._id] = {
          ...newProgress[item._id],
          sets: payload,
        };
      }

      return newProgress;
    });
    setStartedExercise("");
  };

  const completeWorkout = async () => {
    setLoading(true);
    await putBe({
      path: `/completed/${userData?.uid}`,
      body: {
        workoutId: startedWorkout?._id,
        progress,
      },
    }).then(() => {
      setStartedWorkout(null);
      setProgress({});
      router.replace({ pathname: "start" });
    });
    setLoading(false);
  };

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
      completeWorkout,
      loading,
    };
  }, [startedWorkout, startedExercise, progress, startTime, loading]);

  return <StartedWorkoutContext.Provider value={values}>{children}</StartedWorkoutContext.Provider>;
};

export default StartedWorkoutManager;
