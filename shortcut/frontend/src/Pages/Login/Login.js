import React from "react";
import './Login.css';
import { Link, Routes, Route, BrowserRouter as Router, useNavigate} from "react-router-dom";
import { useState } from "react";


// Components
import Logo from "../../Components/Logo";
import Popout from "../../Components/Popout";



const Login =()=>{
    let navigate=useNavigate();

    const [msg, setMsg] = useState('');
    const[header, setHeader] = useState('');
    const [popout, setPopout] =useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    function getEmail(val){
        setEmail(val.target.value)
    }
    function getPassword(val){
        setPassword(val.target.value)
    }


    async function handleClick(){
        const data = {email, password};
        console.log(data);
        let feedback = await fetch('http://localhost:8080/login', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        console.log("passin");

        console.log(feedback);
        console.log("passend");
        if(feedback.check===1){
            const user=feedback;
            navigate('/home', {state:{user}});

            //login succeed
        }
        else{
            setHeader("Login Failed");
            setMsg("Please input correct email and password")
            setPopout(true);
            

        }

    }
 
    return(
        <div className="login">
           <Logo/>
            <div className="login_box">
                <h1>Log In</h1> 
                <input type = "email"  onChange={getEmail}  placeholder="email address" />
            
                
                   
                
                
                <input type="password" onChange={getPassword} placeholder="password"/>
                <button className="login_submit"onClick={handleClick} > Login</button>
        
                <div className="register">
                    <p>Don't have an account?</p>
                    <Link to ="/signup">Click Here</Link> 
            
                </div>
   
            </div> 
            <Popout trigger = {popout} head = {header} message={msg} setTrigger={setPopout}/>
        </div>
    )
}
export default Login;