import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ( { children }: Props ) => {
  // const isAuthenticated = localStorage.getItem("token");
  const isAuthenticated = true
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
