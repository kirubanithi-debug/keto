import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div
      className="relative h-screen  bg-cover bg-center flex flex-col w-full overflow-hidden pt-1"
      style={{
        backgroundImage:
          "linear-gradient(rgba(20,20,20,0.7), rgba(20,20,20,0.7)),url('/src/assets/photo.jpg') ",
      }}
      id="Header"
    >
      <Navbar />
    </div>
  );
};

export default Header;
