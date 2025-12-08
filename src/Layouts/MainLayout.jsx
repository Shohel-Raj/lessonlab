import React from "react";
import Navbar from "../Components/navbar";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import Wraper from "../Components/Wraper";

const MainLayout = () => {
  return (
    <div>
      <div className="bg-base-100 shadow-sm">
        <Wraper>
          <Navbar />
        </Wraper>
      </div>

      <Outlet />
      <ToastContainer/>
    </div>
  );
};

export default MainLayout;
