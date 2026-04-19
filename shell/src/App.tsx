import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import { Logout, useAuth } from "federation_auth/components";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import SignUp from "./components/SignUp";

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <p>Welcome! You are logged in.</p>
    <p>This is a test and the production url works</p>
    <Logout />
  </div>
);

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route
        path="/signin"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
