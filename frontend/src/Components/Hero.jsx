import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

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
    </>
  );
};

export default Hero;
