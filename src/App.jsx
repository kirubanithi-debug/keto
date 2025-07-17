import React from "react";
import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Jobapplication from "./Components/Jobapplication";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import About from "./Components/About";
import Forgotpassword from "./Components/Forgotpassword";

const App = () => {
  return (
    <div className="w-full overflow-hidden ">
      <Router>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="apply" element={<Jobapplication />} />
         <Route path="Login" element={<Login />}  /> 
         <Route path="Signup" element={<Signup />} />
         <Route path="/Forgotpassword" element={<Forgotpassword />} />
         <Route path="About" element={<About />} />
          <Route path="Home" element={<Header />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
