import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const MAX_ATTEMPTS = 3;
  const COOLDOWN_TIME = 60; // seconds

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const startCooldown = () => {
    setCooldownActive(true);
    setTimeout(() => {
      setCooldownActive(false);
      setAttemptCount(0);
    }, COOLDOWN_TIME * 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (cooldownActive) {
      setError("Please wait before trying again");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate different response scenarios
      const random = Math.random();
      if (random < 0.1) {
        throw new Error("EMAIL_NOT_FOUND");
      } else if (random < 0.15) {
        throw new Error("RATE_LIMITED");
      }
      
      console.log("Password reset email sent to:", formData.email);
      setSubmitted(true);
      setAttemptCount(0);
      
    } catch (error) {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);
      
      if (error.message === "EMAIL_NOT_FOUND") {
        setError("No account found with this email address");
      } else if (error.message === "RATE_LIMITED" || newAttemptCount >= MAX_ATTEMPTS) {
        setError("Too many attempts. Please try again later");
        startCooldown();
      } else {
        setError("Something went wrong. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Resend email to:", formData.email);
      // Show success message or update UI
    } catch (error) {
      setError("Failed to resend email. Please try again");
    } finally {
      setResendLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: "" });
    setSubmitted(false);
    setError("");
    setAttemptCount(0);
    setCooldownActive(false);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Check Your Email</h2>
          
          <p className="text-gray-600 mb-4">
            We've sent a password reset link to
          </p>
          <p className="font-semibold text-gray-800 mb-6 break-all">
            {formData.email}
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              <strong>Next steps:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Check your inbox and spam folder</li>
              <li>• Click the reset link in the email</li>
              <li>• Create a new password</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="w-full bg-blue-100 text-blue-700 p-3 rounded-lg hover:bg-blue-200 transition font-medium disabled:opacity-50"
            >
              {resendLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                  Resending...
                </div>
              ) : (
                "Resend Email"
              )}
            </button>
            
            <button
              onClick={() => window.location.href = '/Login'}
              className="inline-flex items-center justify-center w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </button>
            
            <button
              onClick={resetForm}
              className="w-full text-gray-600 hover:text-gray-800 transition text-sm"
            >
              Try different email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        noValidate
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {attemptCount > 0 && attemptCount < MAX_ATTEMPTS && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
              <p className="text-sm text-yellow-800">
                {MAX_ATTEMPTS - attemptCount} attempt(s) remaining
              </p>
            </div>
          </div>
        )}

        {cooldownActive && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-red-600 mr-2" />
              <p className="text-sm text-red-800">
                Please wait {COOLDOWN_TIME} seconds before trying again
              </p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label 
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <Mail className="inline w-4 h-4 mr-1" />
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            aria-describedby={error ? "email-error" : "email-hint"}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              error 
                ? "border-red-300 focus:border-red-500 focus:ring-red-100" 
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
            disabled={loading || cooldownActive}
          />
          
          {!error && (
            <p id="email-hint" className="text-xs text-gray-500 mt-1">
              We'll send reset instructions to this email
            </p>
          )}
          
          {error && (
            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading || cooldownActive}
          className={`w-full p-3 rounded-lg font-medium transition ${
            loading || cooldownActive
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending Reset Link...
            </div>
          ) : (
            "Send Reset Link"
          )}
        </button>

        <div className="mt-6 text-center">
          <button 
            onClick={() => window.location.href = '/Login'}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Remember your password?{" "}
            <button 
              onClick={() => window.location.href = '/Login'}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Sign in here
            </button>
          </p>
        </div>
    </form> 
    </div>
  );
};

export default ForgotPassword;