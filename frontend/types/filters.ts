enum PrimaryMuscles {
  Abdominals = "abdominals",
  Abductors = "abductors",
  Adductors = "adductors",
  Biceps = "biceps",
  Calves = "calves",
  Chest = "chest",
  Forearms = "forearms",
  Glutes = "glutes",
  Hamstrings = "hamstrings",
  Lats = "lats",
  LowerBack = "lower back",
  MiddleBack = "middle back",
  Neck = "neck",
  Quadriceps = "quadriceps",
  Shoulders = "shoulders",
  Traps = "traps",
  Triceps = "triceps",
}

enum Levels {
  Beginner = "beginner",
  Expert = "expert",
  Intermediate = "intermediate",
}

enum Forces {
  Pull = "pull",
  Push = "push",
  Static = "static",
}

enum Categories {
  Strength = "strength",
  Cardio = "cardio",
  OlympicWeightlifting = "olympic weightlifting",
  Plyometrics = "plyometrics",
  Powerlifting = "powerlifting",
  Stretching = "stretching",
  Strongman = "strongman",
}

export interface Filters {
  category: string;
  level: string;
  force: string;
  primaryMuscle: string;
}

const parseDropdownData = (enumObj: Record<string, string>) =>
  Object.keys(enumObj).map((key, index) => ({
    label: enumObj[key],
    _index: index,
    value: key,
  }));

const CategoriesData = parseDropdownData(Categories);
const PrimaryMusclesData = parseDropdownData(PrimaryMuscles);
const LevelsData = parseDropdownData(Levels);
const ForcesData = parseDropdownData(Forces);

export {
  Categories,
  CategoriesData,
  Forces,
  ForcesData,
  Levels,
  LevelsData,
  PrimaryMuscles,
  PrimaryMusclesData,
};
