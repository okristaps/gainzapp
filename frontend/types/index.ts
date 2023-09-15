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
  displayName?: string | null;
  photoURL?: string | null;
}

export interface MongoUser extends MongoUserBody {
  _id: string;
}