import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthWrapper = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {isLogin ? <LoginForm /> : <SignupForm />}
        <p className="text-center text-sm mt-4 text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Log in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthWrapper;
