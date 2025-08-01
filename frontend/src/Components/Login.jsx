import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NavbarOnly from "./NavbarOnly";

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
    if (
      userType === "college" &&
      !collegeEmailRegex.test(value.toLowerCase())
    ) {
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
      setErrors((prev) => ({
        ...prev,
        password: "Password is required",
        general: "",
      }));
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
        ...(passwordError ? { password: passwordError } : {}),
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
        signal: controller.signal,
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
              data,
            })
          );
        } catch (e) {
          console.log("Error caching user data");
        }

        localStorage.setItem("user", JSON.stringify(data));
        navigate(userType === "college" ? "/college-dashboard" : "/Home");
      } else {
        setErrors({
          general:
            data.message ||
            data.detail ||
            "Login failed. Please check your credentials.",
        });
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setErrors({
          general: "Login request timed out. Please try again.",
        });
      } else {
        setErrors({
          general:
            "Connection error. Please check your internet and try again.",
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
        setErrors((prev) => ({ ...prev, email: emailError }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* <NavbarOnly /> */}
      <div className="min-h-screen flex items-center justify-center p-5 pt-24">
        <div className="bg-gray-800 backdrop-blur-lg border border-white/20 p-10 rounded-2xl shadow-2xl w-full max-w-md relative">
          {/* Go Back Button */}
          <button
            onClick={handleGoBack}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 group"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <h1 className="text-center text-2xl font-bold mb-3 text-white mt-8">
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
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
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
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              College
            </button>
          </div>

          <p className="text-center text-white/80 mb-2 text-sm">
            Sign in to your account as{" "}
            {userType === "college" ? "College User" : "General User"}
          </p>
          <p className="text-center text-xs text-white/60 mb-6">
            {userType === "college"
              ? "Please use your college email address (e.g., user@university.edu or user@college.ac.in)"
              : "Enter your email address"}
          </p>

          {errors.general && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-md mb-5 text-sm backdrop-blur-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full p-3 border ${
                  errors.email ? "border-red-500/50" : "border-white/20"
                } rounded-md text-sm bg-white/10 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-300">{errors.email}</p>
              )}
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full p-3 border ${
                  errors.password ? "border-red-500/50" : "border-white/20"
                } rounded-md text-sm bg-white/10 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                required
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-300">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between mb-5">
              <label className="flex items-center text-sm text-white">
                <input
                  type="checkbox"
                  className="mr-2 rounded bg-white/10 border-white/20 text-blue-600 focus:ring-blue-500"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link
                to="/forgotpassword"
                className="text-blue-300 underline text-sm hover:text-blue-200 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full p-3 rounded-md text-sm font-medium transition-all duration-200 ${
                loading
                  ? "bg-blue-400/50 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
              }`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-5">
            <p className="text-sm text-white/80">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-300 underline text-sm font-medium hover:text-blue-200 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
