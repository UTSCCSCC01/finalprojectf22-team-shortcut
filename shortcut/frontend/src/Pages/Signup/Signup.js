import React from "react";
import {useNavigate} from "react-router-dom";
import "./Signup.css";
import Popout from "../../Components/Popout";
import { useState, useEffect} from "react";


const Signup =()=>{

    let navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [popout, setPopout] = useState(false); 
    const [msg, setMsg] = useState('');
    const [header, setHeader] = useState('');
   

    

    function same_password(){
        if(password !== password2 ){
            setPopout(true);
            setHeader("Create Account Failed");
            setMsg("Two passwords are different");
            
        }
        else if (password.length<6){
            setPopout(true);
            setHeader("Create Account Failed");
            setMsg("Please contain at least 6 characters");
            
        }
        else{
            
            handleSubmit();
        }
    }

    async function handleSubmit(){
        const data = {email, password};
        console.log(data);
        let feedback = await fetch('http://localhost:8080/signup', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
            
        feedback = await feedback.json();
        if(feedback.result ==='1'){
            setPopout(true);
            setHeader("Congratulations!");
            setMsg("Your account is created");
            // account creat succeed

        }
        else{
            setPopout(true);
            setHeader("Create Account Failed");
            setMsg("Email already exists");
            // account create failed
        }
        

    }

 


    return(
        <div>
            
            <div className="signup_box">
                <h1>Sign Up</h1>
                <input type = "email"  onChange = {e=>setEmail(e.target.value)} placeholder="your email address" />
                <input type="password" onChange = {e=>setPassword(e.target.value)} placeholder="your password"/>
                <input type="password" onChange = {e=>setPassword2(e.target.value)} placeholder="confirm password"/>

                <div className="button_group">
                    <button className="submit" data-inline="true" onClick = {same_password}> Create Account</button>
                    <button className="back" data-inline="true" onClick={()=> navigate("/")}> Back to Login</button>
                </div>
        
            </div>

            <Popout trigger ={popout} head = {header} message={msg} setTrigger={setPopout}/>
        </div>         
        
        
    );
}
