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

  return (
    <div className=" w-full z-10 bg-transparent">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-20 lg:px-32">
        <img src={logo} alt="logo" className="h-12 w-40 object-contain" />
        <ul className="hidden md:flex gap-7 font-bold text-white">
          <li className="hover:text-gray-400">
            <a href="#Header" className="cursor-pointer">
              Home
            </a>
          </li>
          <li className="hover:text-gray-400">
            <a href="#About" className="cursor-pointer">
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
        <div className="hidden md:flex bg-white text-center rounded-full items-center-safe px-10 w-20 h-10  justify-center  text-[#0499fc] border-2 border-[#0499fc] font-bold shadow transition duration-300 hover:bg-[#0499fc] hover:text-white">
          <a href="" onClick={handleLogin} className="text-center">
            log in
          </a>
        </div>
      </div>
      {/* Centered content below navbar */}
      <div className="flex flex-col items-center justify-center h-140 text-white">
        <p className="flex text-4xl md:text-4xl sm:text-2xl font-bold mb-4 text-center md:h-20 sm:h-10">
          Find the job using Keto for specific resources
        </p>
        <a
          href=""
          onClick={handleClick}
          className="mt-4 flex bg-blue-600 text-center rounded-full items-center-safe px-10 w-40 h-10  justify-center  text-black border-2 border-[#0408fc] font-bold shadow transition duration-300 hover:bg-[#0499fc] hover:text-white"
        >
          Start the journey
        </a>
        <span>Join with us just click👆</span>
      </div>
    </div>
  );
};

export default Navbar;
