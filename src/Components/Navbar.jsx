// src/components/Navbar.jsx

import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import {
  User as UserIcon,
  Mail,
  BadgeCheck,
  LogOut,
  UserCircle
} from "lucide-react";

const capitalize = (str) =>
  typeof str === "string" && str.length
    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    : "";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  // Fetch user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  // Navigation helpers
  const goTo = (path) => navigate(path);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    navigate("/login");
  };
  const goToProfile = () => {
    setProfileOpen(false);
    navigate("/profile");
  };

  // Profile dropdown trigger: only icon!
  const ProfileTrigger = () =>
    user ? (
      <div
        className="relative"
        ref={profileRef}
      >
        <UserIcon
          className="w-8 h-8 rounded-full border-2 border-white cursor-pointer hover:border-blue-400 transition text-white"
          tabIndex={0}
          aria-label="User profile"
          onClick={() => setProfileOpen((o) => !o)}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") setProfileOpen((o) => !o);
          }}
        />
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-300 z-50 text-gray-800 animate-fadeIn">
            <div className="p-4 border-b flex gap-3 items-center bg-gradient-to-r from-blue-600/90 to-blue-500/90 text-white rounded-t-lg">
              <div className="flex-shrink-0 bg-white border-2 border-blue-300 rounded-full p-1">
                <UserCircle className="w-10 h-10 text-blue-600" />
              </div>
              <div className="overflow-hidden">
                <div className="font-semibold text-md truncate">
                  {user.user?.username || user.user?.email?.split("@")[0] || "User"}
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-200 truncate mt-1">
                  <Mail className="w-4 h-4" /> {user.user?.email || "-"}
                </div>
                <div className="flex items-center gap-2 text-xs mt-1">
                  <BadgeCheck className="w-4 h-4 text-lime-400" />
                  <span className="font-semibold">
                    {capitalize(user.userType || "General")}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 grid gap-1">
              <button
                onClick={goToProfile}
                className="w-full text-left flex items-center gap-2 px-2 py-1 hover:bg-blue-50 rounded font-medium transition text-blue-600"
              >
                <UserIcon size={16} />
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-2 py-1 text-red-600 hover:bg-red-50 rounded font-medium transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    ) : (
      <button
        onClick={() => goTo("/login")}
        aria-label="Log in"
        className="bg-white rounded-full flex items-center justify-center w-10 h-10 text-[#0499fc] border-2 border-[#0499fc] font-bold shadow transition duration-300 hover:bg-[#0499fc] hover:text-white"
      >
        <UserIcon className="w-6 h-6" />
      </button>
    );

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/src/assets/background.jpg')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
      <div className="relative z-10 w-full min-h-screen">
        {/* NAVBAR */}
        <div className="container mx-auto w-full flex justify-between items-center py-2 md:px-20 lg:px-10 relative">
          <img src={logo} alt="logo" className="h-12 w-30 object-contain" />

          {/* Navigation Menu */}
          <ul className="hidden md:flex gap-7 font-bold text-white z-20">
            <li className="hover:text-gray-300 transition">
              <button onClick={() => goTo("/home")} className="cursor-pointer">
                Home
              </button>
            </li>
            <li className="hover:text-gray-300 transition">
              <button onClick={() => goTo("/about")} className="cursor-pointer">
                About
              </button>
            </li>
            <li className="hover:text-gray-300 transition">
              <a href="#Contact" className="cursor-pointer">
                Contact
              </a>
            </li>
            <li className="hover:text-gray-300 transition">
              <a href="#Services" className="cursor-pointer">
                Services
              </a>
            </li>
          </ul>

          {/* Profile Icon Section (no button, just icon) */}
          <div className="hidden md:flex items-center z-50">
            <ProfileTrigger />
          </div>
        </div>
        {/* Centered Hero Content */}
        <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
          <h1 className="text-3xl md:text-5xl lg:text-4xl font-bold mb-6 text-center leading-tight">
            Find the job using Keto for specific resources
          </h1>
          <p className="text-lg md:text-xl mb-8 text-center text-gray-200 max-w-2xl">
            Discover amazing opportunities and connect with the best resources for your career growth
          </p>
          <button
            onClick={() => goTo("/apply")}
            className="bg-blue-600 rounded-full flex items-center justify-center w-60 h-12 text-white border-2 border-blue-600 font-bold shadow-lg transition duration-300 hover:bg-blue-700 hover:shadow-xl transform hover:scale-105"
          >
            Start the journey
          </button>
          <span className="mt-4 text-gray-300">Join with us just click 👆</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
