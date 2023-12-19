import { getBe } from "api/index";
import { AuthContext } from "auth/authManager";
import { WeeklySummary } from "components/dashboard/dashboardScreen";
import moment from "moment";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface WeekInfoManagerProps {
  children: React.ReactNode;
}

interface WeeklyContext {
  currentWeek: any;
  minWeek: number;
  maxWeek: any;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
  weekStart: string;
  weekEnd: string;
  loading: boolean;
  data: any;
  animationDirection: string;
}

export const WeeklyInfoContext = createContext<WeeklyContext>({
  currentWeek: null,
  goToPreviousWeek: () => {},
  goToNextWeek: () => {},
  minWeek: 1,
  maxWeek: null,
  weekStart: "",
  weekEnd: "",
  loading: false,
  data: {},
  animationDirection: "slideInLeft",
});

const WeeklyInfoManager: React.FC<WeekInfoManagerProps> = ({ children }) => {
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [animationDirection, setAnimationDirection] = useState("");
  const [currentWeek, setCurrentWeek] = useState(moment());
  const minWeek = 1;
  const maxWeek = moment().isoWeek();

  const givenDate = moment.utc(currentWeek);

  const startOfWeek = givenDate.clone().startOf("week");
  const endOfWeek = givenDate.clone().endOf("week");

  const startOfWeekStr: string = startOfWeek.toISOString();
  const endOfWeekStr: string = endOfWeek.toISOString();

  const goToPreviousWeek = () => {
    const previousWeek = currentWeek.clone().subtract(1, "week");
    if (previousWeek.isoWeek() >= minWeek) {
      setAnimationDirection("slideInLeft");
      setCurrentWeek(previousWeek);
    }
  };

  const goToNextWeek = () => {
    const nextWeek = currentWeek.clone().add(1, "week");
    if (nextWeek.isoWeek() <= maxWeek) {
      setAnimationDirection("slideInRight");
      setCurrentWeek(nextWeek);
    }
  };

  const getWorkoutData = useCallback(async () => {
    setLoading(true);
    await getBe({
      path: `/completed/${userData?.uid}`,
      params: { startDate: startOfWeekStr, endDate: endOfWeekStr, weeklySummary: true },
    })
      .then((res) => setData(res))
      .catch((err) => {
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [startOfWeekStr, endOfWeekStr, currentWeek]);

  useEffect(() => {
    getWorkoutData();
  }, [currentWeek]);

  const values: WeeklyContext = useMemo(() => {
    return {
      currentWeek,
      minWeek,
      maxWeek,
      goToPreviousWeek,
      goToNextWeek,
      weekStart: startOfWeekStr,
      weekEnd: endOfWeekStr,
      loading,
      data,
      animationDirection,
    };
  }, [currentWeek, startOfWeekStr, endOfWeekStr, loading, data, animationDirection]);

  return <WeeklyInfoContext.Provider value={values}>{children}</WeeklyInfoContext.Provider>;
};

export default WeeklyInfoManager;
