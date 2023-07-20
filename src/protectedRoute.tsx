import { useAuthState } from "./store/authStore";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthState();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
