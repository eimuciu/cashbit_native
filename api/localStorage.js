import AsyncStorage from '@react-native-async-storage/async-storage';

export const setCache = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const getCache = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearCache = async () => {
  try {
    const value = await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
