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
  X,
  ChevronDown,
  ArrowRight,
  Briefcase,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Heart
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
      localStorage.removeItem("user"); // Clear corrupted data
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
  const goTo = (path) => {
    setMobileMenuOpen(false);
    setProfileOpen(false); // Close profile dropdown too
    navigate(path);
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

  // Profile dropdown trigger component with safe user access
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
            : 'bg-white text-blue-600 hover:bg-blue-50'
        }`}
      >
        Sign In
      </button>
    );

  // Navigation menu items with proper event handling
  const NavItems = ({ className = "", mobile = false }) => (
    <ul className={className}>
      <li className={mobile ? "border-b border-gray-100 last:border-b-0" : ""}>
        <button 
          onClick={() => goTo("/home")} 
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
          onClick={() => goTo("/about")} 
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
          onClick={() => {
            const contactSection = document.getElementById('Contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
              setMobileMenuOpen(false);
            }
          }}
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
          onClick={() => {
            const servicesSection = document.getElementById('Services');
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: 'smooth' });
              setMobileMenuOpen(false);
            }
          }}
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

  // Background style for the SVG pattern
  const backgroundStyle = {
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat'
  };

  return (
    <>
      {/* Professional Background - Using inline style */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={backgroundStyle}
        ></div>
      </div>

      {/* Professional Fixed Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/50' 
          : 'bg-white/10 backdrop-blur-md border-b border-white/10'
      }`}>
        <div className="container mx-auto h-full flex justify-between items-center px-6 lg:px-8">
          {/* Professional Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => goTo("/home")}>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Keto" className="h-10 object-contain" />
              <div className={`hidden md:block transition-colors ${scrolled ? 'text-gray-800' : 'text-white'}`}>
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
          
          {/* Professional Mobile Menu */}
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

      {/* Professional Content Area */}
      <div className="relative z-10 pt-20 min-h-screen">
        <main className="flex flex-col items-center justify-center px-6 py-20 min-h-[calc(100vh-5rem)]">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Unlock Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Career Potential
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Connect with top employers and discover opportunities that match your skills and aspirations. Your dream career awaits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => goTo("/apply")}
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => goTo("/about")}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
            
            <p className="mt-8 text-gray-300 text-sm">
              Join thousands of professionals who found their perfect match
            </p>
          </div>
        </main>
      </div>

      {/* Professional Footer */}
      <footer className="relative z-10 bg-slate-900/95 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Keto" className="h-8 object-contain" />
                <div className="text-white">
                  <h3 className="text-lg font-bold">Keto</h3>
                  <p className="text-xs text-gray-300">Career Solutions</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering careers and connecting talent with opportunities. Your trusted partner in professional growth and success.
              </p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                  <Instagram className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => goTo("/home")}
                    className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => goTo("/about")}
                    className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => goTo("/apply")}
                    className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    Apply Now
                  </button>
                </li>
                {user && (
                  <li>
                    <button 
                      onClick={() => goTo("/track")}
                      className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
                    >
                      Track Application
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Services</h4>
              <ul className="space-y-2">
                <li>
                  <button className="text-gray-300 hover:text-white transition-colors text-sm block py-1">
                    Career Counseling
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white transition-colors text-sm block py-1">
                    Job Placement
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white transition-colors text-sm block py-1">
                    Resume Building
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white transition-colors text-sm block py-1">
                    Interview Prep
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      123 Career Street<br />
                      Professional District<br />
                      Business City, BC 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">contact@keto.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-white font-semibold text-lg mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm mb-4">
                Subscribe to our newsletter for the latest job opportunities and career tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-300 text-sm text-center md:text-left">
                © 2025 Keto Career Solutions. All rights reserved.
              </div>
              <div className="flex items-center gap-1 text-gray-300 text-sm">
                Made with <Heart className="w-4 h-4 text-red-400 mx-1" fill="currentColor" /> by Keto Team
              </div>
              <div className="flex gap-6 text-sm">
                <button className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </button>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </button>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Navbar;
