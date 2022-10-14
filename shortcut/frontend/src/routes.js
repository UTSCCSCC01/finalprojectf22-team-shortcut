import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Logo from "./Components/Logo";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/PersonalProfile";
import GeneralCourse from "./Pages/Course/GeneralCourse";
import CourseDescription from "./Pages/Course/CourseDescription";
import GeneralProgram from "./Pages/Program/GeneralProgram";
import ProgramDescription from "./Pages/Program/ProgramDescription";
import CommentForm from "./Pages/CommentForm/CommentForm";


const routes=()=>{

    return(
        
        
        <Router>
              
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path ="/signup" element={<Signup/>} />
                <Route path = "/home" element={<Home/>}/>
                <Route path = "/profile" element={<Profile/>}/>
                <Route exact path = "/course" element={<GeneralCourse/>}/>
                <Route path="/course/:code" element={<CourseDescription/>}/> 
                <Route exact path = "/program" element={<GeneralProgram/>}/>
                <Route path = "/program/:name" element={<ProgramDescription/>}/>
                <Route path="/course/:code/commentForm" element={<CommentForm/>}/> 
                {/* <Route path='*'><SomeComponent /></Route> */}
            </Routes>
        </Router>
        
    )  
    
    
}

export default routes;
    