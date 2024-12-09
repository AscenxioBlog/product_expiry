import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
import { IoPersonAddSharp } from "react-icons/io5";
import { PiListPlusFill } from "react-icons/pi";
import { PiListNumbers } from "react-icons/pi";

const Sidebar = ({ onLogout }) => {
  let myToken =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  let decoded = jwtDecode(myToken);
  console.log(decoded);
  const menuItems = [
    {
      path: "/add-product",
      label: "Add Product",
      icon: <PiListPlusFill className=" inline" />,
    },
    decoded.role == "Admin" && {
      path: "/add-staff",
      label: "Add Staff",
      icon: <IoPersonAddSharp className=" inline" />,
    },
    {
      path: "/product-list",
      label: "Product List",
      icon: <PiListNumbers className=" inline" />,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <AiFillSetting className=" inline" />,
    },
  ].filter(Boolean);
  console.log(menuItems);

  return (
    <div className="w-64 bg-blue-600 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block p-3 rounded-lg ${
                  isActive ? "bg-blue-700" : "hover:bg-blue-500"
                }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          </li>
        ))}
        <li>
          <button
            className=" p-[10px] w-[100%] rounded-[10px] bg-[#2b2928] font-bold flex gap-2 justify-center items-center mt-[50px]"
            onClick={onLogout}
          >
            <BiLogOut className=" text-[20px] inline" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
