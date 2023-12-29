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
