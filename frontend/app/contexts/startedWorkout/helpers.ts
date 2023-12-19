import moment from "moment";
import { Categories, reppedCategories, reppedWithoutWeightCategories } from "types/filters";
import { Workout } from "types/index";

const parseWorkouts = (workout: Workout) =>
  workout?.exercises?.reduce((acc, curr) => {
    const exerciseInfo = {
      category: curr?.category,
      equipment: curr?.equipment,
      finished: false,
      inProgrss: false,
    };

    if (curr?.category === Categories.Cardio) {
      acc[curr._id] = {
        ...exerciseInfo,
        time: null,
        distance: null,
      };
    } else {
      acc[curr._id] = {
        ...exerciseInfo,
        sets: [
          {
            reps: null,
            weight: null,
          },
        ],
      };
    }

    return acc;
  }, {});

const parseProgressData = (item: any, payload: any) => {
  const baseProgress = {
    category: item?.category,
    equipment: item?.equipment,
    finished: true,
    started: false,
  };

  if (item?.category === Categories.Cardio) {
    return {
      ...baseProgress,
      distance: payload?.distance,
      time: payload?.time,
    };
  }

  if (
    reppedCategories.includes(item?.category) ||
    reppedWithoutWeightCategories.includes(item?.category)
  ) {
    return {
      ...baseProgress,
      sets: payload,
    };
  }

  return baseProgress;
};

const getDuration = (startTime: number) => {
  const currentTime = new Date().getTime();
  const elapsedDuration = moment.duration(currentTime - startTime);
  return moment.utc(elapsedDuration.asMilliseconds()).format("HH:mm:ss");
};

export { parseWorkouts, parseProgressData, getDuration };
