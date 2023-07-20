interface User {
  firstname: string;
  lastname: string;
  email: string;
}

export function storeUserData(userData: User) {
  try {
    const userDataJSON = JSON.stringify(userData);
    localStorage.setItem("user", userDataJSON);
  } catch (error) {
    console.error("Error storing user data in local storage:", error);
  }
}

export function getUserDataFromLocalStorage() {
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

export function deleteUserData() {
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error deleting user data from local storage:", error);
  }
}
