import AsyncStorage from "@react-native-async-storage/async-storage";

const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(data)
    );

    return true;
  } catch (error) {
    console.log("Storage Save Error:", error);
    throw error;
  }
};

const getData = async (key) => {
  try {
    const data =
      await AsyncStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Storage Get Error:", error);
    throw error;
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);

    return true;
  } catch (error) {
    console.log(
      "Storage Remove Error:",
      error
    );
    throw error;
  }
};

export {
  saveData,
  getData,
  removeData,
};