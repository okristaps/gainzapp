import { CategoriesData, Filters, ForcesData, LevelsData, PrimaryMusclesData } from "types/filters";
import Direction from "assets/images/direction.svg";
import Level from "assets/images/level.svg";
import Force from "assets/images/force.svg";
import Bicep from "assets/images/bicepempty.svg";

export interface FilterConfig {
  name: keyof Filters;
  clearDisabled?: boolean;
  data: any[];
  title: string;
  Icon: React.FC<any>;
}

const initialFilters = {
  category: CategoriesData[0].value,
  level: "",
  force: "",
  primaryMuscle: "",
};

const filtersConfig: FilterConfig[] = [
  {
    name: "category",
    clearDisabled: true,
    data: CategoriesData,
    title: "Category:",
    Icon: Direction,
  },
  {
    name: "level",
    data: LevelsData,
    title: "Level:",
    Icon: Level,
  },
  {
    name: "force",
    data: ForcesData,
    title: "Force:",
    Icon: Force,
  },
  {
    name: "primaryMuscle",
    data: PrimaryMusclesData,
    title: "Muscle:",
    Icon: Bicep,
  },
];

export { filtersConfig, initialFilters };
