import Dashboard from "assets/images/dashboard.svg";
import Workouts from "assets/images/workouts.svg";
import Start from "assets/images/start.svg";
import Logs from "assets/images/logs.svg";
import User from "assets/images/user.svg";

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
    path: "/",
  },

  {
    name: "workouts",
    title: "Workouts",
    icon: Workouts,
    path: "/workouts",
  },
  {
    name: "start",
    title: "Start",
    icon: Start,
    path: "/start",
  },
  {
    name: "logs",
    title: "Logs",
    icon: Logs,
    path: "/logs",
  },
  {
    name: "profile",
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

export { tabs, clearHistory };
