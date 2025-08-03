import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Jobapplication from "./Components/Jobapplication";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Services from "./Components/Services";
import Track from "./Components/Track";
import Forgotpassword from "./Components/Forgotpassword";

const App = () => {
  return (
    <div className="w-full overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/apply" element={<Jobapplication />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} /> */}
          <Route path="/track" element={<Track />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
