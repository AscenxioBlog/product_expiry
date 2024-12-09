import React, { useState } from "react";
import API_URL from "../Config";


const AddStaff = () => {
  const [staffData, setStaffData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "Staff",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData({
      ...staffData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
        body: JSON.stringify(staffData),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Staff added successfully!");
        setStaffData({ fullname: "", email: "", password: "", role: "Staff" });
        setErrors({});
      } else {
        setErrors(data.errors || {});
      }
    } catch (err) {
      console.error("Error adding staff:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Add Staff
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-sm font-semibold text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={staffData.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullname && (
              <p className="text-sm text-red-500 mt-1">{errors.fullname}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={staffData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={staffData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-600"
            >
              Role
            </label>
            <select
              name="role"
              value={staffData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Staff
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
