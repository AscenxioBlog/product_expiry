import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = ({onLogout}) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={onLogout}/>
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
