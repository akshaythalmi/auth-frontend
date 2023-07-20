import axios from "axios";
import { useState } from "react";

const API_URL = process.env.BASE_URL;

const useAuthService = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username: string, password: string) => {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          setCurrentUser(response.data);
        }

        return response.data;
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const register = (username: string, password: string) => {
    return axios.post(API_URL + "signup", {
      username,
      password,
    });
  };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  };

  return {
    currentUser,
    login,
    logout,
    register,
    getCurrentUser,
  };
};

export default useAuthService;
