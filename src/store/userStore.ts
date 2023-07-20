import { proxy, useSnapshot } from "valtio";

export const userStore = proxy({ user: getStoredUserData() } || { user: null });

export function useUserState() {
  return useSnapshot(userStore);
}

function getStoredUserData() {
  try {
    const userDataJSON = localStorage.getItem("user");

    if (userDataJSON) {
      return JSON.parse(userDataJSON);
    }
    return null;
  } catch (error) {
    console.error("Error retrieving user data from local storage:", error);
    return null;
  }
}
