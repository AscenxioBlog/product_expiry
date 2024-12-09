import React from "react";

const SignUpForm = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Sign Up
      </h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-gray-600"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
