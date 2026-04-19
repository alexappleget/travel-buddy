import { Navigate } from "react-router-dom";
import { IRoutes } from "../types/interface";

export const PrivateRoute = ({ isAuthenticated, children }: IRoutes) => {
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};
