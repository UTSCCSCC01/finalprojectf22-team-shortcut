import './PersonalProfile.css';


import Button from '../../Components/Button';
import React, {Component} from 'react';
import { Link, Routes, Route, BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";


import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import components
import Popout from '../../Components/Popout';
import Logo from "../../Components/Logo";





const PersonalProfile =()=> {
    let navigate = useNavigate();


    // popout for error msg 
    const [msg, setMsg] = useState('');
    const[header, setHeader] = useState('');
    const [popout, setPopout] =useState(false);

    

    // used to determine whether need editing
    const[edit, setEdit] = useState(true);

    // data from previous page, all object
    const {state} = useLocation();
    const [email, setEmail]=useState(state.user.email);
    const [password, setPassword] = useState(state.user.password);
    const [name, setName] = useState(state.user.name);
    const [dateofbirth, setdateOfBirth] = useState (state.user.dateofbirth);
    const [gender, setGender] = useState(state.user.gender);
    const [Program, setProgram]= useState(state.user.Program);
    const[Description, setDescription]=useState(state.user.Description);
    

  
    // data locally to store changes
    const[name2, setName2]=useState(name.data);
    const[email2, setEmail2]=useState(email.data);

    const[gender2, setGender2]=useState(gender.data);
    const[Program2, setProgram2]=useState(Program.data);
    const[Description2, setDescription2]=useState(Description.data);


    const [dateOfBirth2, setdateOfBirth2]= useState(new Date(dateofbirth.data));
    

    
    


    const signout =()=>{
        navigate('/');
    }

    const home =()=>{
        const feedback = state.user
        navigate('/home', {state: {feedback}});
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
    
    const packUserInfo=()=>{
        
        name.data=name2;

        email.data=email2;
        Description.data=Description2;

        gender.data=gender2;
        Program.data=Program2;
        
        dateofbirth.data=dateOfBirth2;
        
    }

    async function submit(){
        packUserInfo();
        setEdit(true);
        const data = state.user;
        console.log(state.user);
        console.log(state.user._id);

        
        let feedback = await fetch('http://localhost:8080/edit', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        console.log(feedback);
        
        if(feedback.result===1){
            setEdit(true);
            console.log("succeed");

        }
        else{
            
            setMsg("Your profile cannot be saved");
            setHeader("Save Editing Failed");
            setPopout(true);

            console.log("failed");

        }
    
    }
    

    async function submit_delete(){
        const data = {email};
        console.log(data);
        let feedback = await fetch('http://localhost:8080/deleteUser', {
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
            setMsg("Sorry, you account cannot be deleted");
            setHeader("Delete Failed");     
            setPopout(true);       

        }
    }

    return (
        
        <div className="profile" >
            
            <Logo top="4em"/>
            
            <div style={{flexDirection: "row", display:"flex", marginTop: "5em"}}>

                    <h1 style={{fontWeight:"bolder"}} > Welcome, {name.data}</h1>

                    {edit ? (
                        <Button className = "edit_button" text = "Edit" col="steelblue" func={handleEdit}/>
                    ):(
                        <div>
                            <Button text = "Save" col="steelblue" func={submit}></Button>
                            
                        </div>
                       
                    )}
            </div>

                    <div style={{display: "flex", flexDirection: "row", textAlign: "left"}}>
                        <h3>Name</h3>
                        <input className="profile_input" type="text" placeholder ={name2} onChange={changeName} disabled = {edit}/>
                        
                        <h3>Email</h3>
                        <input className="profile_input"
                        type="text" placeholder ={email2} onChange={changeEmail} disabled = "true"/>
                        
                        
                        
                        
                    </div>
                    
                    <div style={{marginTop:"1.5em", display: "flex", flexDirection: "row", textAlign: "left"}}>
                        <h3>Gender</h3>
                        <input  className="profile_input" type="text" placeholder ={gender2} onChange={changeGender} disabled = {edit}/>
            
                        <h3>Program</h3>
                        <input  className="profile_input" type="text" placeholder ={Program2} onChange={changeProgram} disabled = {edit}/>
                    </div>
                    

                    <div style={{marginTop:"1.5em", display: "flex"}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h3>My&nbsp;Birthday</h3> 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <DatePicker disabled ={edit} className="date_input" display= {dateOfBirth2} selected={dateOfBirth2} onChange={(date)=>setdateOfBirth2(date)} />
                    </div>

                    

                    <div style={{marginTop:"1.5em", display: "flex", flexDirection:"row"}}>
                        <h3>Something About Me</h3>
    
                        <input className="description_input" type="text" placeholder ={Description2} onChange={changeDescription} disabled = {edit}/>
                    </div>

                    
                    
                

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="buttons">
                        <Button text = "Home" col="steelblue" func={home}></Button>
                        <Button text = "Sign Out" col="steelblue" func={signout}></Button>

                        <Button text = "Delete Account"col="steelblue" func={submit_delete}></Button>

                        &nbsp;
                    </div>
                    
                    
      
           
        
            <Popout trigger ={popout} head = {header} message={msg} setTrigger={setPopout}/>
            
        </div>
    );
}    

export default PersonalProfile;