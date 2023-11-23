import { ExerciseInfoContainer } from "components/common/infoContainer";
import Header from "components/header";
import { Dispatch, SetStateAction, useEffect } from "react";
import useElapsedTime from "../../../hooks/timerHook";
import moment from "moment";
import { calculateCompletedPercentage } from "./helpers";

const StartedHeader = ({
  startTime,
  setStartTime,
  finished,
  progress,
}: {
  startTime: number | undefined;
  setStartTime: Dispatch<SetStateAction<number | undefined>>;
  finished: boolean;
  progress: any;
}) => {
  const elapsedTime = useElapsedTime(startTime, finished);
  const formattedTime = moment.utc(elapsedTime.asMilliseconds()).format("HH:mm:ss");

  useEffect(() => {
    if (!finished && !startTime) {
      setStartTime(new Date().getTime());
    }
  }, [finished, startTime]);

  const completedPercentage = calculateCompletedPercentage(progress);

  return (
    <>
      <Header title={"Selected workout"} />
      <ExerciseInfoContainer
        info1={{
          title: "Time spent",
          sub: formattedTime,
        }}
        info2={{
          title: "Completed",
          sub: completedPercentage.toFixed(0) + " %",
        }}
      />
    </>
  );
};

export default StartedHeader;
