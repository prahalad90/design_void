import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

const PrivateRoute = ( { children }: HeaderProps ) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
