import React from "react";
import logo from "../assets/logo.svg";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/apply");
  };
  const handleLogin = () => {
    navigate("/Login");
  };
  
  const handleAbout = () => {
    navigate("/About");
  };

  return (
    <div className=" w-full  bg-transparent">
      <div className="container mx-auto w-full flex justify-between items-center py-2 md:px-20 lg:px-10">
        <img src={logo} alt="logo" className="h-12 w-30 object-contain" />
        <ul className="hidden md:flex gap-7 font-bold text-white">
          <li className="hover:text-gray-400">
            <a href="#Header" className="cursor-pointer">
              Home
            </a>
          </li>
          <li className="hover:text-gray-400">
            <a href="#" onClick={handleAbout} className="cursor-pointer">
              About
            </a>
          </li>
          <li className="hover:text-gray-400">
            <a href="#Contact" className="cursor-pointer">
              Contact
            </a>
          </li>
          <li className="hover:text-gray-400">
            <a href="#Services" className="cursor-pointer">
              Services
            </a>
          </li>
        </ul>
        <div className="hidden md:flex bg-white rounded-full items-center-safe w-28 h-10  justify-center text-[#0499fc] border-2 border-[#0499fc] font-bold shadow transition duration-300 hover:bg-[#0499fc] hover:text-white">
          <a href="" onClick={handleLogin} className="text-center">
            log in
          </a>
        </div>
      </div>
      {/* Centered content below navbar */}
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <p className="flex text-3xl md:text-4xl sm:text-2xl font-bold mb-2 text-center md:h-10 sm:h-10">
          Find the job using Keto for specific resources
        </p>
        <a
          href=""
          onClick={handleClick}
          className="mt-2 flex bg-blue-600 rounded-full items-center-safe w-52 h-10  justify-center  text-black border-2 border-[#0408fc] font-bold shadow transition duration-300 hover:bg-[#0499fc] hover:text-white"
        >
          Start the journey
        </a>
        <span>Join with us just click👆</span>
      </div>
    </div>
  );
};

export default Navbar;
