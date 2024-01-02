import "./filters";
import "./components";

export interface MongoUserBody {
  uid: string;
  email?: string | null;
  user_workouts?: string[] | null;
  user_excercises?: string[] | null;
  custom_workouts_created?: number | null;
  height?: number | null;
  weight?: number | null;
  age?: number | null;
  metric_units?: boolean | null;
  display_name?: string | null;
  photoURL?: string | null;
  birthDate?: Date | null;
  sex?: string | null;
}

export interface MongoUser extends MongoUserBody {
  _id: string;
}

export interface Workout {
  _id: string;
  name: string;
  description: string[];
  forces: string[];
  equipment: string[];
  instructions: string[];
  exercises: Exercise[] | ExerciseIdentifier[];
}

export interface ExerciseIdentifier {
  _id: string;
  name: string;
  category?: string;
  equipment?: string;
}

export interface Exercise {
  _id: string;
  name: string;
  description: string[];
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  category: string;
  instructions: string[];
}

export interface ExerciseSet {
  reps: number;
  weight: number | null;
  _id: string;
}

export interface ExerciseProgress {
  date: string; // Change this to the actual type for date if necessary
  sets: ExerciseSet[];
  _id: string;
}

export interface ExerciseData {
  name: string;
  progress: ExerciseProgress[];
  leveledAverageData: { avg: number; date: string }[];
  avgData: { avg: number; date: string }[];
}

export interface FavouriteExercise {
  exerciseId: string;
  name: string;
  progress: ExerciseProgress[];
}

export interface FavouriteExerciseResponse {
  _id: string;
  exerciseProgress: Record<string, ExerciseData>;
  dropdownData: { id: string; name: string }[];
}
