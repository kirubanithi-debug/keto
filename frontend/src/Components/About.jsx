import React from "react";
import NavbarOnly from "./NavbarOnly";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="w-full overflow-hidden">
      <NavbarOnly />
      
      {/* About Page Content */}
      <div className="relative z-10 pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Keto</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              We provide specialized job search services and career solutions to help you find the perfect opportunity that matches your skills and aspirations.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Mission Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                  <p className="text-gray-300 mb-4">
                    At Keto, we believe that everyone deserves to find meaningful work that aligns with their skills, values, and career goals. Our mission is to bridge the gap between talented professionals and forward-thinking companies.
                  </p>
                  <p className="text-gray-300">
                    We leverage cutting-edge technology and personalized service to create lasting connections that benefit both job seekers and employers.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl p-8 border border-blue-400/30">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Empowering Careers</h3>
                    <p className="text-gray-300">Connecting talent with opportunity</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Values Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Integrity</h3>
                <p className="text-gray-300">
                  We maintain the highest standards of honesty and transparency in all our interactions.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
                <p className="text-gray-300">
                  We continuously evolve our technology and methods to provide the best possible service.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Excellence</h3>
                <p className="text-gray-300">
                  We strive for excellence in every aspect of our service delivery and client relationships.
                </p>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Our Impact</h2>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">5,000+</div>
                  <p className="text-gray-300">Successful Placements</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
                  <p className="text-gray-300">Partner Companies</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
                  <p className="text-gray-300">Client Satisfaction</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
                  <p className="text-gray-300">Years of Experience</p>
                </div>
              </div>
            </div>
            
            {/* Team Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Our Team</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Career Advisors</h3>
                  <p className="text-gray-300">
                    Experienced professionals who provide personalized career guidance and industry insights.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Tech Specialists</h3>
                  <p className="text-gray-300">
                    Our technology team ensures our platform delivers the best matching algorithms and user experience.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Industry Partners</h3>
                  <p className="text-gray-300">
                    We work closely with leading companies across various industries to understand their hiring needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
};

export default About;
