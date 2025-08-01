import React from "react";
import NavbarOnly from "./NavbarOnly";
import Hero from "./Hero";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <NavbarOnly />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
