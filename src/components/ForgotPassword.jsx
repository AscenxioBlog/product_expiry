import { useState } from "react";
import API_URL from "../Config";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendLink = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/user/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        setMessage("Reset link sent! Check your email.");
      } else {
        setMessage(data.message || "Error sending reset link.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email address below, and we’ll send you a link to reset
          your password.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={handleSendLink}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
        >
          Send Reset Link
        </button>
        {message && (
          <p
            className={`mt-4 text-sm ${
              message.includes("sent") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
