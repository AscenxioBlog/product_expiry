import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API_URL from "../Config";


const LoginPage = ({ onLogin, setRememberMe, rememberMe }) => {
  let [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  let [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const getValues = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    console.log({
      ...loginData,
    });
  };
  
  const forhandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.status === 200) {
        const token = data.token;
          if (rememberMe) {
            localStorage.setItem("authToken", token); 
          } else {
            sessionStorage.setItem("authToken", token); 
          }

        onLogin();
        navigate("/");
      } else {
        setErrors({
          email: data.emailMessage || null,
          password: data.passwordMessage || null,
        });
      }
      console.log(data); // Here you will get the JWT token if login is successful
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className=" text-2xl font-bold text-center text-gray-700 mb-6">
          Log In
        </h2>
        <form onSubmit={forhandleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm text-gray-600 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              onChange={getValues}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              onChange={getValues}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <label className=" text-[0.8rem] flex gap-1 mb-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleCheckboxChange}
            />
            Remember Me
          </label>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Log In
          </button>
          <NavLink to="/password-reset" className=" text-[0.9rem] underline cursor-pointer text-blue-600 mt-2">
            Forgot password?
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
