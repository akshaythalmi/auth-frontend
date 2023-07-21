interface User {
  firstname: string;
  lastname: string;
  email: string;
}

export function storeUserData(userData: User, token?: any) {
  try {
    const userDataJSON = JSON.stringify(userData);
    localStorage.setItem("user", userDataJSON);
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Error storing user data in local storage:", error);
  }
}

export function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error getting the token:", error);
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
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Error deleting user data from local storage:", error);
  }
}
