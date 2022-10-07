import './PersonalProfile.css';
import Button from '../../Components/Button';
import React, {Component} from 'react';
import { Link, Routes, Route, BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import App from "../../App"; 

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";






const PersonalProfile =()=> {
    let navigate = useNavigate();
    const {state} = useLocation();
    const {email, password, name, dateOfBirth, gender, Program, Description} = state.user;
    console.log(Program);
    const[edit, setEdit] = useState(true);
    
    

    
  
    console.log(Description);
    const[name2, setName2]=useState(name.data);
    const[email2, setEmail2]=useState(email.data);

    const[gender2, setGender2]=useState(gender.data);
    const[Program2, setProgram2]=useState(Program.data);
    const[Description2, setDescription2]=useState(Description.data);
    const [dateOfBirth2, setdateOfBirth2]=useState(null);

    const signout =()=>{
        navigate('/');
    }
    const home =()=>{
        
    }
    const handleEdit =()=>{
        setEdit(false);
    }
    const changeName =(val)=>{
        setName2(val.target.value);
    }
    const changeEmail=(val)=>{
        setEmail2(val.target.value);
    }
    const changeProgram=(val)=>{
        setProgram2(val.target.value);
    }
    const changeDescription=(val)=>{
        setDescription2(val.target.value);
    }
    const changeGender=(val)=>{
        setGender2(val.target.value);
    }
  
    async function submit(){
        setEdit(true);
        

    }

    async function submit_delete(){
        const data = {email};
        console.log(data);
        let feedback = await fetch('http://localhost:8080/delete', {
            method:'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        console.log(feedback);
        
        if(feedback.result===1){
            navigate('/');
        }
        else{
            

        }
    }

    return (
        <div>
         
            <Button text = "Home" col="steelblue" onClick={home}></Button>

            <div className = "profile_box">
                <h1 className="Welcome"> Welcome, {name.data}</h1>

                    {edit ? (
                        <Button text = "edit" col="steelblue"onClick={handleEdit}></Button>
                    ):(
                        <div>
                            <button onClick={submit}>save</button>
                            &nbsp;&nbsp;
                            <button>cancel</button>
                        </div>
                       
                    )}

                    <div className="one_entry">
                        <h3>Name</h3>
                        <input type="text" placeholder ={name2} onChange={changeName} disabled = {edit}/>
                    </div>
                    
                    <div className="one_entry">
                        <h3>Email</h3>
                        <input type="text" placeholder ={email2} onChange={changeEmail} disabled = {edit}/>
                    </div>
                    
                    <div className="one_entry">
                        <h3>Gender</h3>
                        <input type="text" placeholder ={gender2} onChange={changeGender} disabled = {edit}/>
                    </div>
                    
                    <div className="one_entry">
                        <h3>Program</h3>
                        <input type="text" placeholder ={Program2} onChange={changeProgram} disabled = {edit}/>
                    </div>

                    <div className="one_entry">
                        <h3>Something About Me</h3>
                        <input type="text" placeholder ={Description2} onChange={changeDescription} disabled = {edit}/>
                    </div>

                    <div className="one_entry">
                        <h3> My Birthday </h3>
                        <DatePicker selected={dateOfBirth2} onChange={(date)=>setdateOfBirth2(date)} ></DatePicker>
                    </div>
                    <div className="buttons">
                        <Button text = "Sign out" col="steelblue" onClick={signout}></Button>

                        <Button text = "Delete Account"col="steelblue" onClick={submit_delete}></Button>
                    </div>
                    
                    
      
            </div>
            
        </div>
    );
}

export default PersonalProfile;
