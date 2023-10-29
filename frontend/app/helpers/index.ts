import { Exercise, ExerciseIdentifier } from "types/index";

export const compareExercises = (arr1: ExerciseIdentifier[], arr2: Exercise[]) => {
  if (arr1.length !== arr2.length || arr1.length === 0) {
    return false;
  }

  return arr1.every((element, index) => element._id === arr2[index]._id);
};
