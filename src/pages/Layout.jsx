import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const layout = () => {
  return (
    <div>
      <h1></h1>
      <div className="min-h-screen bg-gray-50">
      <Navbar/>
        <Outlet />
      </div>
    </div>
  );
};

export default layout;
