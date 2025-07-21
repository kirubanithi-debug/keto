import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("general"); // 'general' or 'college'

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // clear error

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user info or token (optional: store in localStorage/sessionStorage)
        localStorage.setItem("user", JSON.stringify(data));
        alert(`Login successful as ${userType === "college" ? "College User" : "General User"}!`);

        // Optionally redirect or navigate
        // navigate("/dashboard");
      } else {
        setError(data.message || data.detail || "Login failed. Please check credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setError(""); // Clear any existing errors when switching user type
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-3 text-gray-800">
          Welcome Back
        </h1>

        {/* User Type Selection */}
        <div className="flex mb-6">
          <button
            type="button"
            onClick={() => handleUserTypeChange("general")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-md border transition-colors duration-200 ${
              userType === "general"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            General User
          </button>
          <button
            type="button"
            onClick={() => handleUserTypeChange("college")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md border-t border-r border-b transition-colors duration-200 ${
              userType === "college"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            College
          </button>
        </div>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in to your account as{" "}
          {userType === "college" ? "College User" : "General User"}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-5">
            <label className="flex items-center text-sm text-gray-700">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link
              to="/Forgotpassword"
              className="text-blue-600 underline text-sm hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/Signup"
              className="text-blue-600 underline text-sm font-medium hover:text-blue-800"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
