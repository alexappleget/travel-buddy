import { Navigate, Route, Routes } from "react-router-dom";
import {
  Logout,
  SignInForm,
  SignUpForm,
  useAuth,
} from "federation_auth/components";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { Dashboard } from "federation_dashboard/components";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route
        path="/signin"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SignInForm />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SignUpForm />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Dashboard logoutButton={<Logout />} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
