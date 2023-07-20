import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authState } from "./store/authStore";
import Login from "./pages/login";
import Registration from "./pages/register";
import Dashboard from "./pages/dashboard";
import { getUserDataFromLocalStorage } from "./utils";
import { ProtectedRoute } from "./protectedRoute";
import Profile from "./pages/profile";
import Layout from "./components/layout";

function App() {
  const data = getUserDataFromLocalStorage();
  if (data) {
    authState.isAuthenticated = true;
  } else {
    authState.isAuthenticated = false;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
