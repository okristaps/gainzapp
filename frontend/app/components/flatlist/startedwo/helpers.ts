const calculateCompletedPercentage = (progress: any) => {
  const exerciseKeys = Object.keys(progress ?? {});
  const totalExercises = exerciseKeys?.length ?? 0;

  if (!exerciseKeys || totalExercises === 0) {
    return 0;
  }

  const completedExercises = exerciseKeys.reduce((count, exerciseKey) => {
    const exercise = progress[exerciseKey];
    return count + (exercise.finished ? 1 : 0);
  }, 0);

  const completedPercentage = (completedExercises / totalExercises) * 100;
  return completedPercentage;
};

export { calculateCompletedPercentage };
