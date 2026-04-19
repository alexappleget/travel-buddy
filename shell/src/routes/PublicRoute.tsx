import { Navigate } from "react-router-dom";
import { IRoutes } from "../types/interface";

export const PublicRoute = ({ isAuthenticated, children }: IRoutes) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
