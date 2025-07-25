import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState("general");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Basic email format regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // College emails must end with .edu or .ac.in
  const collegeEmailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.(edu|ac\.in)$/;

  // Check for cached credentials on mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("keto_email");
      const savedUserType = localStorage.getItem("keto_userType");

      if (savedEmail) {
        setEmail(savedEmail);
        if (savedUserType) setUserType(savedUserType);
      }
    } catch (e) {
      console.log("Error accessing localStorage");
    }
  }, []);

  // Get cached user data if available
  const getCachedUser = (email) => {
    try {
      const cached = sessionStorage.getItem(`login_${email}`);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        // Cache valid for 30 minutes
        if (Date.now() - timestamp < 1800000) return data;
      }
    } catch (e) {
      console.log("Cache retrieval error", e);
    }
    return null;
  };

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!isValidEmail(value)) return "Please enter a valid email address";
    if (userType === "college" && !collegeEmailRegex.test(value.toLowerCase())) {
      return "College users must use a .edu or .ac.in email address";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailError = validateEmail(value);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError, general: "" }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, password: "Password is required", general: "" }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.password;
        return newErrors;
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear general error
    setErrors((prev) => ({ ...prev, general: "" }));

    // Full validation before attempting login
    const emailError = validateEmail(email);
    const passwordError = !password ? "Password is required" : "";

    if (emailError || passwordError) {
      setErrors({
        ...(emailError ? { email: emailError } : {}),
        ...(passwordError ? { password: passwordError } : {})
      });
      return;
    }

    // Remember user email if selected
    if (rememberMe) {
      localStorage.setItem("keto_email", email);
      localStorage.setItem("keto_userType", userType);
    }

    // Start loading state
    setLoading(true);

    try {
      // Set up request timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok) {
        // Cache successful login data to speed up future logins
        try {
          sessionStorage.setItem(
            `login_${email}`,
            JSON.stringify({
              timestamp: Date.now(),
              data
            })
          );
        } catch (e) {
          console.log("Error caching user data");
        }

        localStorage.setItem("user", JSON.stringify(data));
        navigate(userType === "college" ? "/college-dashboard" : "/Home");
      } else {
        setErrors({
          general: data.message || data.detail || "Login failed. Please check your credentials."
        });
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setErrors({
          general: "Login request timed out. Please try again."
        });
      } else {
        setErrors({
          general: "Connection error. Please check your internet and try again."
        });
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    if (email) {
      const emailError = validateEmail(email);
      if (emailError) {
        setErrors(prev => ({...prev, email: emailError}));
      } else {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.email;
          return newErrors;
        });
      }
    }
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

        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-5 text-sm">
            {errors.general}
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
              onChange={handleEmailChange}
              className={`w-full p-3 border ${errors.email ? "border-red-300" : "border-gray-300"} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full p-3 border ${errors.password ? "border-red-300" : "border-gray-300"} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between mb-5">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
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
