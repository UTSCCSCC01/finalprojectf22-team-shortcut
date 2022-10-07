import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Logo from "./Components/Logo";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/PersonalProfile";


const routes=()=>{

    return(
        
        
        <Router>
              
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path ="/signup" element={<Signup/>} />
                <Route path = "/home" element={<Home/>}/>
                <Route path = "/profile" element={<Profile/>}/>
            </Routes>
        </Router>
        
    )  
    
    
}

export default routes;
    