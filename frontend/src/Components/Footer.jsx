import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  Phone,
  MapPin,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Heart
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
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
              <li>
                <button 
                  onClick={() => goTo("/track")}
                  className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
                >
                  Track Application
                </button>
              </li>
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
  );
};

export default Footer;
