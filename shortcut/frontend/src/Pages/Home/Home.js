import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../Components/Logo";
import Navbar from "../../Components/Navbar";
import background from "../../Images/b10.jpg";
import "./Home.css"

const Home =()=>{
    let navigate = useNavigate();
    //get user data
    const {state} =useLocation();
    const user = state.user;
    


    function toProfile(){
        navigate('/profile', {state:{user}});
    }
    function toCourse(){
        navigate('/course', {state:{user}});
    }
    function toProgram(){
        navigate('/program', {state:{user}});
    }

    function toGradReq(){
        navigate('/GradReq', {state:{user}});
    }

    function toHistory(){
        navigate('/History', {state:{user}});
    }



    return(
        <div className="home">
            <Navbar toProfile={toProfile}/>
            
            <h1 style={{marginTop: "2em", font:"Arial", fontSize:"4em", textAlign:"center"}}>Welcome to shortcUTSC</h1>
            <div style={{textDecorationLine:"underline", marginTop: "3em", fontSize: "2.8em", display: "flex", flexDirection:"row"}}>
                <a style={{color:"sienna"}} onClick={toCourse}>Course Search</a>
                <a style={{color:"sienna"}} onClick={toProgram}>Program Search</a>
            </div>
            <div style={{textDecorationLine:"underline", marginTop: "2.5em", fontSize: "2.8em", display: "flex", flexDirection:"row"}}>
                <a style={{color:"sienna"}} onClick={toHistory}>Course Planning</a>
                <a  style={{color:"sienna"}} onClick={toGradReq}>Graduation Requirements</a>
            </div>
                
            
        </div>
    )
}
export default Home;
