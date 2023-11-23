import { useEffect, useState } from "react";
import moment, { Duration } from "moment";

const useElapsedTime = (startTime: number | undefined, finished: boolean) => {
  const [elapsedTime, setElapsedTime] = useState<Duration>(moment.duration(0));

  useEffect(() => {
    let intervalId: number;

    if (!finished && startTime) {
      const updateElapsedTime = () => {
        const currentTime = new Date().getTime();
        const elapsedDuration = moment.duration(currentTime - startTime);
        setElapsedTime(elapsedDuration);
      };
      updateElapsedTime();
      intervalId = setInterval(updateElapsedTime, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, finished]);

  return elapsedTime;
};

export default useElapsedTime;
