import React from "react";
import NavbarOnly from "./NavbarOnly";
import Footer from "./Footer";

const Services = () => {
  return (
    <div className="w-full overflow-hidden">
      <NavbarOnly />
      
      {/* Services Page Content */}
      <div className="relative z-10 pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Comprehensive career solutions designed to help you succeed in your professional journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Service 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Career Counseling</h3>
              <p className="text-gray-300 mb-6">
                Get personalized guidance from industry experts to help you make informed career decisions and plan your professional path.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• One-on-one consultations</li>
                <li>• Career assessment tests</li>
                <li>• Industry insights</li>
                <li>• Goal setting sessions</li>
              </ul>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Job Placement</h3>
              <p className="text-gray-300 mb-6">
                Access our extensive network of employers and job opportunities tailored to your skills and preferences.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Employer partnerships</li>
                <li>• Job matching algorithms</li>
                <li>• Application tracking</li>
                <li>• Interview scheduling</li>
              </ul>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Resume Building</h3>
              <p className="text-gray-300 mb-6">
                Create compelling resumes that highlight your strengths and catch the attention of potential employers.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Professional templates</li>
                <li>• ATS optimization</li>
                <li>• Content writing assistance</li>
                <li>• Multi-format exports</li>
              </ul>
            </div>
            
            {/* Service 4 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Interview Preparation</h3>
              <p className="text-gray-300 mb-6">
                Master the art of interviewing with our comprehensive preparation program and practice sessions.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Mock interviews</li>
                <li>• Question databases</li>
                <li>• Behavioral coaching</li>
                <li>• Performance feedback</li>
              </ul>
            </div>
            
            {/* Service 5 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Skill Development</h3>
              <p className="text-gray-300 mb-6">
                Enhance your professional skills with our curated learning resources and training programs.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Online courses</li>
                <li>• Certification programs</li>
                <li>• Skill assessments</li>
                <li>• Learning paths</li>
              </ul>
            </div>
            
            {/* Service 6 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Career Analytics</h3>
              <p className="text-gray-300 mb-6">
                Track your career progress with detailed analytics and insights to make data-driven decisions.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Progress tracking</li>
                <li>• Market analysis</li>
                <li>• Salary benchmarks</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-gray-300 mb-6">
                Choose the service that best fits your career goals and take the first step towards your dream job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Book Consultation
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/20 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
};

export default Services;
