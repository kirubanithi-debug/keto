import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div
      className="relative min-h-screen mb-4 bg-cover bg-center flex flex-col w-full overflow-hidden pt-32"
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
