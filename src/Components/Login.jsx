import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("general");
  const [loading, setLoading] = useState(false); // <-- Add loading state

  // Basic email format regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // College emails must end with .edu or .ac.in
  const collegeEmailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.(edu|ac\.in)$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // <-- Start loading

    if (!email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (
      userType === "college" &&
      !collegeEmailRegex.test(email.toLowerCase())
    ) {
      setError(
        "College users must login with a valid .edu or .ac.in email address."
      );
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

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
        localStorage.setItem("user", JSON.stringify(data));
        // alert(
        //   `Login successful as ${
        //     userType === "college" ? "College User" : "General User"
        //   }!`
        // );

        if (userType === "college") {
          navigate("/college-dashboard");
        } else {
          navigate("/Home");
        }
      } else {
        setError(
          data.message ||
            data.detail ||
            "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // <-- Stop loading
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setError("");
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
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md border-t border-r border-b border-l transition-colors duration-200 ${
              userType === "college"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            College
          </button>
        </div>

        <p className="text-center text-gray-500 mb-2 text-sm">
          Sign in to your account as{" "}
          {userType === "college" ? "College User" : "General User"}
        </p>
        <p className="text-center text-xs text-gray-400 mb-6">
          {userType === "college"
            ? "Please use your college email address (e.g., user@university.edu or user@college.ac.in)"
            : "Enter your email address"}
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
            className={`w-full p-3 rounded-md text-sm font-medium transition-colors duration-200 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
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
