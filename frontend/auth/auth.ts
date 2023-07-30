import * as SecureStore from "expo-secure-store";

const getToken = async () => (await SecureStore.getItemAsync("token")) ?? null;

export default { getToken };
