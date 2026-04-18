import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Logout } from "federation_auth/components";

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <p>Welcome! You are logged in.</p>
    <p>This is a test and the production url works!</p>
    <Logout />
  </div>
);

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
