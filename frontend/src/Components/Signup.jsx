import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";
import NavbarOnly from "./NavbarOnly";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate password strength
  useEffect(() => {
    const { password } = formData;
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setLoading(true);

    // Form validation
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
     const payload = {
      username: formData.name,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
     };
     const response = await fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);///if error showes remove
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      setTimeout(() => {
        navigate("/login"); // Redirect after 2 seconds
      }, 2000);
    } else {
      if (typeof data === "object" && data !== null) {
        const backendErrors = {};
        for (const key in data) {
          backendErrors[key] = Array.isArray(data[key])
        ? data[key].join(" ")
        : data[key];
        }
        setErrors(backendErrors);
      } else {
        setErrors({ submit: "An error occurred. Please try again." });
      }
    }

    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        submit: "There was a problem creating your account. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <NavbarOnly />
      <div className="relative z-10 pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card with backdrop blur and glass effect */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
            {/* Header section */}
            <div className="px-8 py-6 text-white border-b border-white/20">
              <h2 className="text-3xl font-bold text-center">Create an Account</h2>
            <p className="text-blue-100 text-center text-sm mt-1">Join our community today</p>
          </div>
          
          {/* Form section */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Full Name field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
              </div>
              {errors.name && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
              </div>
              {errors.email && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.password}
                </div>
              )}
              
              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Password strength:</span>
                    <span className="text-xs font-medium">
                      {passwordStrength === 0 && "Very weak"}
                      {passwordStrength === 1 && "Weak"}
                      {passwordStrength === 2 && "Medium"}
                      {passwordStrength === 3 && "Strong"}
                      {passwordStrength === 4 && "Very strong"}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        passwordStrength === 0 ? "bg-red-500" : 
                        passwordStrength === 1 ? "bg-orange-500" : 
                        passwordStrength === 2 ? "bg-yellow-500" : 
                        passwordStrength === 3 ? "bg-green-500" : "bg-green-600"
                      }`}
                      style={{ width: `${passwordStrength * 25}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg border ${
                    errors.confirmPassword ? "border-red-300" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all ${
                loading
                  ? "bg-blue-400 cursor-wait"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              } text-white shadow-md hover:shadow-lg`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* General error message */}
            {errors.submit && (
              <div className="mt-3 text-red-500 text-sm text-center">
                {errors.submit}
              </div>
            )}

            {/* Success message */}
            {submitted && (
              <div className="mt-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                <CheckCircle className="mr-2 text-green-500" size={18} />
                <span className="text-sm font-medium">Your account has been created successfully!</span>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
