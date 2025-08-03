import React from "react";
import NavbarOnly from "./NavbarOnly";
import Hero from "./Hero";
import Footer from "./Footer";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <NavbarOnly />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
