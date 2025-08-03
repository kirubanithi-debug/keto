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
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const capitalize = (str) =>
  typeof str === "string" && str.length
    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    : "";

const NavbarOnly = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef();
  const mobileMenuRef = useRef();

  // Handle scroll effect with cleanup
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch user from localStorage on mount with error handling
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
    }
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
  const goTo = (path, delay = 0) => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
    setTimeout(() => {
      navigate(path);
    }, delay);
  };

  // Add new function for smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
      setProfileOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
          className={`flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
            scrolled 
              ? 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200' 
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }`}
          aria-label="User profile"
          onClick={() => setProfileOpen((o) => !o)}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <UserCircle className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <span className="hidden md:block font-medium text-sm">
            {user.user?.username || user.username || "User"}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
            scrolled ? 'text-gray-500' : 'text-white/70'
          } ${profileOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 text-gray-800 overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">
                    {user.user?.username || user.username || "User"}
                  </h3>
                  <p className="text-blue-100 text-sm truncate flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {user.user?.email || user.email || "No email"}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-300" />
                    <span className="text-xs font-medium text-blue-100">
                      {capitalize(user.userType || "Member")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-1">
              <button
                onClick={goToProfile}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
                  <UserIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Profile Settings</p>
                  <p className="text-xs text-gray-500">Manage your account</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Sign Out</p>
                  <p className="text-xs text-gray-500">Logout from your account</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    ) : (
      <button
        onClick={() => goTo("/login")} 
        className={`px-6 py-2.5 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
          scrolled 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-white text-blue-600 hover:bg-blue-500 hover:text-white'
        }`}
      >
        Sign In
      </button>
    );

  // Navigation menu items
  const NavItems = ({ className = "", mobile = false }) => (
    <ul className={className}>
      <li className={mobile ? "border-b border-gray-100 last:border-b-0" : ""}>
        <button 
          onClick={() => scrollToSection("hero")} 
          className={`cursor-pointer font-medium transition-all duration-200 ${
            mobile 
              ? "block w-full text-left px-6 py-4 hover:bg-blue-50 hover:text-blue-600" 
              : "hover:text-blue-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
          }`}
        >
          Home
        </button>
      </li>
      <li className={mobile ? "border-b border-gray-100 last:border-b-0" : ""}>
        <button 
          onClick={() => scrollToSection("about")} 
          className={`cursor-pointer font-medium transition-all duration-200 ${
            mobile 
              ? "block w-full text-left px-6 py-4 hover:bg-blue-50 hover:text-blue-600" 
              : "hover:text-blue-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
          }`}
        >
          About
        </button>
      </li>
      <li className={mobile ? "border-b border-gray-100 last:border-b-0" : ""}>
        <button 
          onClick={() => scrollToSection("contact")}
          className={`cursor-pointer font-medium transition-all duration-200 ${
            mobile 
              ? "block w-full text-left px-6 py-4 hover:bg-blue-50 hover:text-blue-600" 
              : "hover:text-blue-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
          }`}
        >
          Contact
        </button>
      </li>
      <li className={mobile ? "border-b border-gray-100 last:border-b-0" : ""}>
        <button 
          onClick={() => scrollToSection("services")}
          className={`cursor-pointer font-medium transition-all duration-200 ${
            mobile 
              ? "block w-full text-left px-6 py-4 hover:bg-blue-50 hover:text-blue-600" 
              : "hover:text-blue-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
          }`}
        >
          Services
        </button>
      </li>
      
      {user && (
        <li className={mobile ? "" : ""}>
          <button 
            onClick={() => goTo("/track")} 
            className={`cursor-pointer font-medium transition-all duration-200 ${
              mobile 
                ? "block w-full text-left px-6 py-4 hover:bg-blue-50 hover:text-blue-600" 
                : "hover:text-blue-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
            }`}
          >
            Track Application
          </button>
        </li>
      )}
    </ul>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/50' 
        : 'bg-blue-900/9 border-b border-white'
    }`}>
      <div className="container w-full max-w-full mx-auto h-full flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => goTo("/home")}>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Keto" className="h-10 object-contain" />
            <div className={`hidden md:block transition-colors ${scrolled ? 'text-blue-800' : 'text-white'}`}>
              <h1 className="text-xl font-bold">Keto</h1>
              <p className="text-xs opacity-70">Career Solutions</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <NavItems className={`flex gap-8 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <ProfileTrigger />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 focus:outline-none ${
              scrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-20 right-0 w-80 bg-white shadow-2xl transform transition-all duration-300 ease-out z-40 ${
            mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
            <p className="text-sm text-gray-500 mt-1">Explore our platform</p>
          </div>
          <NavItems 
            className="py-2 text-gray-700" 
            mobile={true}
          />
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              © 2025 Keto. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarOnly;
