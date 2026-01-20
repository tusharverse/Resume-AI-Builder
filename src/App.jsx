import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import Login from "./pages/Login.jsx";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeID" element={<ResumeBuilder />} />
        </Route>

        <Route path="view/:resumeID" element={<Preview />} />
        <Route path="login" element={<Login/>} />
      </Routes>
    </>
  );
};

export default App;
