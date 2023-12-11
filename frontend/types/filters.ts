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
  LowerBack = "lower+back",
  MiddleBack = "middle+back",
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
  OlympicWeightlifting = "olympic+weightlifting",
  Plyometrics = "plyometrics",
  Powerlifting = "powerlifting",
  Stretching = "stretching",
  Strongman = "strongman",
}

enum Equipment {
  none = "none",
  bands = "bands",
  barbell = "barbell",
  bodyOnly = "body only",
  cable = "cable",
  dumbbell = "dumbbell",
  eZCurlBar = "e-z curl bar",
  exerciseBall = "exercise ball",
  foamRoll = "foam roll",
  kettlebells = "kettlebells",
  machine = "machine",
  medicineBall = "medicine ball",
  other = "other",
}

export interface Filters {
  category: string;
  level: string;
  force: string;
  primaryMuscle: string;
}

const parseDropdownData = (enumObj: Record<string, string>) =>
  Object.keys(enumObj).map((key, index) => ({
    label: `${enumObj[key]}`.replace("+", " "),
    _index: index,
    value: enumObj[key],
  }));

const CategoriesData = parseDropdownData(Categories);
const PrimaryMusclesData = parseDropdownData(PrimaryMuscles);
const LevelsData = parseDropdownData(Levels);
const ForcesData = parseDropdownData(Forces);

export const reppedCategories = [
  Categories.Strength,
  "olympic weightlifting",
  Categories.Powerlifting,
  Categories.Strongman,
];

export const reppedWithoutWeightCategories = [Categories.Stretching, Categories.Plyometrics];

export const noWeightEquipment = [Equipment.bodyOnly, Equipment.none, Equipment.foamRoll];

export {
  Categories,
  CategoriesData,
  Forces,
  ForcesData,
  Levels,
  Equipment,
  LevelsData,
  PrimaryMuscles,
  PrimaryMusclesData,
};
