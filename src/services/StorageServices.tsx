import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async () => {
    return await AsyncStorage.getItem("token");
}

export const setItem = async (access_token: string) => {
    return await AsyncStorage.setItem("token", access_token);
}

export const clear = async () => {
    return await AsyncStorage.removeItem("token");
}

