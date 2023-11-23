import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Exercise, ExerciseIdentifier } from "types/index";

interface ExerciseModalManagerProps {
  children: React.ReactNode;
}

interface ExerciseModalContext {
  exercise: Exercise | null | ExerciseIdentifier;
  exercisesLoading: boolean;
  setExercise: Dispatch<SetStateAction<Exercise | ExerciseIdentifier | null>>;
  _id: string;
}

export const ExerciseModalContext = createContext<ExerciseModalContext>({
  exercise: null,
  exercisesLoading: false,
  setExercise: () => {},
  _id: "",
});

const ExerciseModalManager: React.FC<ExerciseModalManagerProps> = ({ children }) => {
  const [exercise, setExercise] = useState<Exercise | ExerciseIdentifier | null>(null);

  const { isLoading = false, refetch } = useQuery({
    retry: false,
    enabled: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,

    queryKey: ["exercise"],
    queryFn: async () =>
      await getBe({
        path: `/exercises`,
        params: {
          id: exercise?._id,
        },
      }),
  });

  useEffect(() => {
    if (exercise === null) return;

    let typeOfExercise: "Exercise" | "ExerciseIdentifier" | "null" = "null";
    if (exercise) {
      typeOfExercise =
        typeof exercise === "object" && exercise.hasOwnProperty("category")
          ? "Exercise"
          : "ExerciseIdentifier";
    }

    if (typeOfExercise === "ExerciseIdentifier" && exercise?._id) {
      refetch().then((res: any) => {
        setExercise(res?.data?.exercises[0] ?? {});
      });
    }
  }, [exercise, refetch]);

  const values: ExerciseModalContext = useMemo(() => {
    return {
      exercise,
      setExercise,
      exercisesLoading: isLoading && !exercise?.hasOwnProperty("category"),
    };
  }, [exercise]);

  return <ExerciseModalContext.Provider value={values}>{children}</ExerciseModalContext.Provider>;
};

export default ExerciseModalManager;
