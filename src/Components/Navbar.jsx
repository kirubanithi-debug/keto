// src/components/Navbar.jsx

import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import {
  User as UserIcon,
  Mail,
  BadgeCheck,
  LogOut,
  UserCircle,
  Menu,
  X
} from "lucide-react";

const capitalize = (str) =>
  typeof str === "string" && str.length
    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    : "";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef();
  const mobileMenuRef = useRef();

  // Fetch user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen, mobileMenuOpen]);

  // Navigation helpers
  const goTo = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };
  
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

  // Profile dropdown trigger component
  const ProfileTrigger = () =>
    user ? (
      <div className="relative" ref={profileRef}>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-blue-600 hover:bg-blue-700 hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="User profile"
          onClick={() => setProfileOpen((o) => !o)}
        >
          <UserCircle className="w-7 h-7 text-white" strokeWidth={1.5} />
        </button>
        
        {profileOpen && (
          <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 text-gray-800 animate-fadeIn overflow-hidden">
            <div className="p-5 border-b flex gap-4 items-center bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <div className="flex-shrink-0 bg-white border-2 border-blue-300 rounded-full p-1.5 shadow-md">
                <UserCircle className="w-12 h-12 text-blue-600" />
              </div>
              <div className="overflow-hidden">
                <div className="font-semibold text-base truncate">
                  {user.user?.username || user.username || "User"}
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-100 truncate mt-1.5">
                  <Mail className="w-3.5 h-3.5" /> {user.user?.email || user.email}
                </div>
                <div className="flex items-center gap-2 text-xs mt-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-lime-400" />
                  <span className="font-medium">
                    {capitalize(user.userType || "General")}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 grid gap-1">
              <button
                onClick={goToProfile}
                className="w-full text-left flex items-center gap-2.5 px-3 py-2 hover:bg-blue-50 rounded-md font-medium transition-colors text-blue-600"
              >
                <UserIcon size={16} />
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md font-medium transition-colors mt-1"
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
        className="bg-white rounded-full flex items-center justify-center w-10 h-10 text-blue-600 border-2 border-blue-600 shadow transition-all duration-300 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <UserIcon className="w-5 h-5" />
      </button>
    );

  // Navigation menu items
  const NavItems = ({ className = "", mobile = false }) => (
    <ul className={className}>
      <li className={mobile ? "border-b border-gray-100" : ""}>
        <button 
          onClick={() => goTo("/home")} 
          className={`cursor-pointer ${
            mobile ? "block w-full text-left px-5 py-3 hover:bg-blue-50" : "hover:text-gray-300 transition-colors"
          }`}
        >
          Home
        </button>
      </li>
      <li className={mobile ? "border-b border-gray-100" : ""}>
        <button 
          onClick={() => goTo("/about")} 
          className={`cursor-pointer ${
            mobile ? "block w-full text-left px-5 py-3 hover:bg-blue-50" : "hover:text-gray-300 transition-colors"
          }`}
        >
          About
        </button>
      </li>
      <li className={mobile ? "border-b border-gray-100" : ""}>
        <a 
          href="#Contact" 
          className={`cursor-pointer ${
            mobile ? "block w-full text-left px-5 py-3 hover:bg-blue-50" : "hover:text-gray-300 transition-colors"
          }`}
        >
          Contact
        </a>
      </li>
      <li className={mobile ? "border-b border-gray-100" : ""}>
        <a 
          href="#Services" 
          className={`cursor-pointer ${
            mobile ? "block w-full text-left px-5 py-3 hover:bg-blue-50" : "hover:text-gray-300 transition-colors"
          }`}
        >
          Services
        </a>
      </li>
      {user && (
        <li className={mobile ? "" : ""}>
          <button 
            onClick={() => goTo("/track")} 
            className={`cursor-pointer ${
              mobile ? "block w-full text-left px-5 py-3 hover:bg-blue-50" : "hover:text-gray-300 transition-colors"
            }`}
          >
            Track
          </button>
        </li>
      )}
    </ul>
  );

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/src/assets/background.jpg')"
      }}
    >
      {/* Overlay with proper opacity */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* NAVBAR - fixed height and consistent padding */}
        <header className="w-full h-20 backdrop-blur-sm bg-black/10">
          <div className="container mx-auto h-full flex justify-between items-center px-4 md:px-6 lg:px-8">
            {/* Logo with proper sizing */}
            <div className="flex items-center">
              <img src={logo} alt="Keto" className="h-12 object-contain" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <NavItems className="flex gap-8 font-medium text-white" />
            </nav>

            {/* Profile and Mobile Menu Buttons */}
            <div className="flex items-center gap-4 z-50">
              {/* Profile Button */}
              <ProfileTrigger />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-white focus:outline-none"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X size={24} className="text-white" />
                ) : (
                  <Menu size={24} className="text-white" />
                )}
              </button>
            </div>
            
            {/* Mobile Menu */}
            <div
              ref={mobileMenuRef}
              className={`md:hidden fixed top-20 right-0 w-64 bg-white shadow-lg rounded-bl-lg transform transition-transform duration-300 ease-in-out z-40 ${
                mobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <NavItems 
                className="py-2 font-medium text-gray-800" 
                mobile={true}
              />
            </div>
          </div>
        </header>

        {/* Hero Content - improved vertical spacing */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-8 text-center leading-tight text-white max-w-3xl">
            Find the job using Keto for specific resources
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-10 text-center text-gray-100 max-w-2xl">
            Discover amazing opportunities and connect with us
          </p>
          <button
            onClick={() => goTo("/apply")}
            className="bg-blue-600 rounded-full flex items-center justify-center w-64 h-14 text-white border-2 border-blue-500 font-bold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl transform hover:translate-y-[-2px]"
          >
            Start the journey
          </button>
          <span className="mt-5 text-gray-300 font-light">Join with us just click 👆</span>
        </main>
      </div>
    </div>
  );
};

export default Navbar;
