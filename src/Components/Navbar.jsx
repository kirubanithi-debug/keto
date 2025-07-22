import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // On mount, check localStorage for user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  // Navigation handlers
  const handleClick = () => navigate("/apply");
  const handleLogin = () => navigate("/login");
  const handleAbout = () => navigate("/about");
  const handleHome = () => navigate("/home");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/src/assets/background.jpg')", // Add your background image path here
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content with higher z-index */}
      <div className="relative z-10 w-full min-h-screen">
        {/* Navbar */}
        <div className="container mx-auto w-full flex justify-between items-center py-2 md:px-20 lg:px-10">
          <img src={logo} alt="logo" className="h-12 w-30 object-contain" />

          {/* Navigation Menu */}
          <ul className="hidden md:flex gap-7 font-bold text-white">
            <li className="hover:text-gray-400">
              <button onClick={handleHome} className="cursor-pointer">
                Home
              </button>
            </li>
            <li className="hover:text-gray-400">
              <button onClick={handleAbout} className="cursor-pointer">
                About
              </button>
            </li>
            <li className="hover:text-gray-400">
              <a href="#Contact" className="cursor-pointer">
                Contact
              </a>
            </li>
            <li className="hover:text-gray-400">
              <a href="#Services" className="cursor-pointer">
                Services
              </a>
            </li>
          </ul>

          {/* Login/Logout Button - Conditional Rendering */}
          <div className="hidden md:flex">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">
                  Welcome, {user.user?.username || user.user?.email || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 rounded-full px-6 py-2 text-white font-bold hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-white rounded-full flex items-center justify-center w-28 h-10 text-[#0499fc] border-2 border-[#0499fc] font-bold shadow transition duration-300 hover:bg-[#0499fc] hover:text-white"
              >
                Log In
              </button>
            )}
          </div>
        </div>

        {/* Centered content below navbar */}
        <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
          <h1 className="text-3xl md:text-5xl lg:text-4xl font-bold mb-6 text-center leading-tight">
            Find the job using Keto for specific resources
          </h1>
          <p className="text-lg md:text-xl mb-8 text-center text-gray-200 max-w-2xl">
            Discover amazing opportunities and connect with the best resources for
            your career growth
          </p>
          <button
            onClick={handleClick}
            className="bg-blue-600 rounded-full flex items-center justify-center w-60 h-12 text-white border-2 border-blue-600 font-bold shadow-lg transition duration-300 hover:bg-blue-700 hover:shadow-xl transform hover:scale-105"
          >
            Start the journey
          </button>
          <span className="mt-4 text-gray-300">
            Join with us just click 👆
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
