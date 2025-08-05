import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Briefcase, ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hasApplication, setHasApplication] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
      // Check if user has submitted an application
      checkApplicationStatus(loggedInUser.email || loggedInUser.user?.email);
    }
  }, []);

  const checkApplicationStatus = async (email) => {
    if (!email) return;
    
    try {
      // Check if user has applied (temporary solution)
      const hasApplied = localStorage.getItem(`applied_${email}`);
      setHasApplication(!!hasApplied);
    } catch (error) {
      console.error("Error checking application status:", error);
      setHasApplication(false);
    }
  };

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">Find Your Dream Career</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Career
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Journey Starts Here
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with top employers and discover opportunities that match your skills and aspirations. Your dream career awaits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user && hasApplication ? (
              <button
                onClick={() => goTo("/search-jobs")}
                className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search Your Place
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => goTo("/apply")}
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            
            <button
              onClick={() => goTo("/about")}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
          
          <p className="mt-8 text-gray-300 text-sm">
            Join thousands of professionals who found their perfect career match
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
