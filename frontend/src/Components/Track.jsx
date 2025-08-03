import React from "react";
import NavbarOnly from "./NavbarOnly";
import Footer from "./Footer";

const Track = () => {
  return (
    <div className="w-full ">
      {/* Track Application Page Content */}
      <div className="relative z-4 pt-1 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Track Your <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Application</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Stay updated on your job application status and never miss an important update.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Search Application */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Enter Application Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Application ID</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
                    placeholder="Enter your application ID"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                Track Application
              </button>
            </div>
            
            {/* Application Status */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Application Status</h2>
              
              {/* Timeline */}
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Application Submitted</h3>
                    <p className="text-gray-300 mb-2">Your application has been successfully submitted and received by our team.</p>
                    <p className="text-sm text-gray-400">January 15, 2025 at 2:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Initial Review</h3>
                    <p className="text-gray-300 mb-2">Your application is currently under initial review by our HR team.</p>
                    <p className="text-sm text-gray-400">January 16, 2025 at 10:15 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Technical Assessment</h3>
                    <p className="text-gray-300 mb-2">You will receive an email with technical assessment details within 24 hours.</p>
                    <p className="text-sm text-gray-400">Pending</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-400 mb-2">Interview Round</h3>
                    <p className="text-gray-400 mb-2">Scheduled after technical assessment completion.</p>
                    <p className="text-sm text-gray-500">Awaiting previous step</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-400 mb-2">Final Decision</h3>
                    <p className="text-gray-400 mb-2">Final hiring decision will be communicated via email.</p>
                    <p className="text-sm text-gray-500">Awaiting previous steps</p>
                  </div>
                </div>
              </div>
              
              {/* Application Details */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Application Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-300 mb-2"><span className="font-semibold">Position:</span> Senior Software Engineer</p>
                    <p className="text-gray-300 mb-2"><span className="font-semibold">Department:</span> Engineering</p>
                    <p className="text-gray-300 mb-2"><span className="font-semibold">Location:</span> Remote</p>
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2"><span className="font-semibold">Application ID:</span> KTO-2025-0001</p>
                    <p className="text-gray-300 mb-2"><span className="font-semibold">Submitted:</span> January 15, 2025</p>
                    <p className="text-gray-300 mb-2"><span className="font-semibold">Expected Response:</span> January 30, 2025</p>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="bg-blue-600/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                  <p className="text-gray-300 mb-4">
                    If you have any questions about your application status, feel free to contact our HR team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="mailto:hr@keto.com"
                      className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      hr@keto.com
                    </a>
                    <a
                      href="tel:+15551234567"
                      className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Track;
