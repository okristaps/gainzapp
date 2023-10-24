import "expo-router/entry";
import "./firebaseConfig";
import "./src/global.css";

import { NATIVE_DEV } from "@env";

if (NATIVE_DEV === "true") {
  require("./auth/google");
}

import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});
