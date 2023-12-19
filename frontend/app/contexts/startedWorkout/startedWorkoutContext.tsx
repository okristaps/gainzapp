import { putBe } from "api/index";
import { AuthContext } from "auth/authManager";
import { router, useNavigation } from "expo-router";
import moment from "moment";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { reppedCategories, reppedWithoutWeightCategories } from "types/filters";
import { Workout } from "types/index";
import { parseProgressData, parseWorkouts } from "./helpers";

import * as SecureStore from "expo-secure-store";

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
  setProgress: Dispatch<SetStateAction<any>>;
  cancelWorkout: () => Promise<any>;
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
  setProgress: () => {},
  cancelWorkout: async () => {},
});

const StartedWorkoutManager: React.FC<StartedWorkoutContextProps> = ({ children }) => {
  const { userData } = useContext(AuthContext);
  const [startedWorkout, setStartedWorkout] = useState<Workout | null>(null);
  const [startedExercise, setStartedExercise] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<any>({});
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const navigation = useNavigation();

  useEffect(() => {
    setOngoingWorkout();
  }, []);

  useEffect(() => {
    if (!progress && startedWorkout) {
      setProgress(parseWorkouts(startedWorkout));
    }
  }, [startedWorkout, progress]);

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

  const handleProgress = useCallback(
    async (item: any, payload: any) => {
      try {
        const newProgress = {
          ...progress,
          [item._id]: parseProgressData(item, payload),
        };

        await saveWorkoutData(newProgress, startedWorkout, startTime);
        setProgress(newProgress);
        setStartedExercise("");
      } catch (error) {
        console.error("Error handling progress:", error);
      }
    },
    [
      progress,
      reppedCategories,
      reppedWithoutWeightCategories,
      saveWorkoutData,
      startedWorkout,
      startTime,
      setProgress,
      setStartedExercise,
    ]
  );

  const clearWorkoutData = async () => {
    try {
      await SecureStore.deleteItemAsync("workoutData");
    } catch (error) {
      console.error("Error clearing workout data:", error);
    }
  };

  const cancelWorkout = async () => {
    await clearWorkoutData();
    router.replace("start");
    setProgress({});
  };

  const setOngoingWorkout = useCallback(async () => {
    const data = await SecureStore.getItemAsync("workoutData");
    if (data?.length) {
      const parsedData = JSON.parse(data ?? "");

      if (parsedData.progress && parsedData.startedWorkout) {
        setProgress(parsedData.progress);
        setStartedWorkout(parsedData.startedWorkout);
        setStartTime(parsedData.starTime);
        router.replace("start/startedwo");
      }
    }
  }, [setProgress, setStartedWorkout, setStartTime, router]);

  function clearHistory() {
    const state = navigation.getState();
    navigation.reset({
      ...state,
      routes: state.routes.map((route) => ({ ...route, state: undefined })),
    });
  }

  const completeWorkout = async () => {
    setLoading(true);
    await putBe({
      path: `/completed/${userData?.uid}`,
      body: {
        workoutId: startedWorkout?._id,
        name: startedWorkout?.name,
        progress,
      },
    }).then((res) => {
      setStartedWorkout(null);
      setProgress({});
      clearHistory();
      clearWorkoutData();
      router.push({
        pathname: "logs/viewPastWorkout",
        params: { workoutId: res?._id, justFinished: true },
      });
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
      setProgress,
      cancelWorkout,
    };
  }, [startedWorkout, startedExercise, progress, startTime, loading]);

  return <StartedWorkoutContext.Provider value={values}>{children}</StartedWorkoutContext.Provider>;
};

const saveWorkoutData = async (progress: any, startedWorkout: Workout, starTime: number) => {
  try {
    await SecureStore.setItemAsync(
      "workoutData",
      JSON.stringify({
        progress,
        startedWorkout,
        starTime,
      })
    );
  } catch (error) {
    console.error("Error saving workout data:", error);
  }
};

export default StartedWorkoutManager;
