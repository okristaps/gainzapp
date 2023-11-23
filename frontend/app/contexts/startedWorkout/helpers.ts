import { Categories } from "types/filters";
import { Workout } from "types/index";

const parseWorkouts = (workout: Workout) =>
  workout?.exercises?.reduce((acc, curr) => {
    const exerciseInfo = {
      category: curr?.category,
      equipment: curr?.equipment,
      finished: false,
      inProgrss: false,
    };

    if (curr?.category === Categories.Strength) {
      acc[curr._id] = {
        ...exerciseInfo,
        sets: [
          {
            reps: 0,
            weight: 0,
          },
        ],
      };
    } else if (curr?.category === Categories.Cardio) {
      acc[curr._id] = {
        ...exerciseInfo,
        time: null,
        distance: null,
      };
    } else {
      acc[curr._id] = exerciseInfo;
    }

    return acc;
  }, {});

export { parseWorkouts };
