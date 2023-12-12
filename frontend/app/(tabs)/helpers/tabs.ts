import Dashboard from "assets/images/dashboard.svg";
import Workouts from "assets/images/workouts.svg";
import Start from "assets/images/start.svg";
import Logs from "assets/images/logs.svg";
import More from "assets/images/more.svg";

function clearHistory(navigation: any) {
  const state = navigation.getState();
  navigation.reset({
    ...state,
    routes: state.routes.map((route) => ({ ...route, state: undefined })),
  });
}

const tabs = [
  {
    name: "index",
    title: "Dashboard",
    icon: Dashboard,
  },

  {
    name: "workouts",
    title: "Workouts",
    icon: Workouts,
  },
  {
    name: "start",
    title: "Start",
    icon: Start,
  },
  {
    name: "logs",
    title: "Logs",
    icon: Logs,
  },
  {
    name: "more",
    title: "More",
    icon: More,
  },
];

export { tabs, clearHistory };
