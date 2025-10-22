import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.JSX";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";  
import Home from "./pages/Home.JSX";  
import Layout from "./pages/Layout.JSX";
import Login from "./pages/Login.JSX";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}>
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
