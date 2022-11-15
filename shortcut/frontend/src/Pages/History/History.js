import './History.css';


import Button from '../../Components/Button';
import * as React from 'react';
import { useParams, Link, Routes, Route, BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import {Select, MenuItem} from '@mui/material';

import { useState, useEffect } from "react";
import Popout from '../../Components/Popout';

import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";


const History =()=> {
    let navigate = useNavigate();

    // popout for error msg 
    const [msg, setMsg] = useState('');
    const[header, setHeader] = useState('');
    const [popout, setPopout] =useState(false);
    
    const {state} = useLocation();
    const user = state.user;

    const [stream, setStream] = useState("");
    const [preference, setPreference] = useState("");
    const [selected, setSelected] = useState("");
    const [courseOptions, setCourseOptions] = useState([]);
    let testingCourseOptions = ["CSCC01", "CSCB09", "CSCC37"];
    testingCourseOptions.sort();
    // let completed = [];
    const [completed, setCompleted] = useState([]);

    useEffect(()=> {reqeustCourses()}, []);

    const updateStream=(val)=>{
        setStream(val.target.value);
    }

    const updatePreference=(val)=>{
        setPreference(val.target.value);
    }

    const handleCancel =()=>{
        const feedback = state.user
        navigate(-1, {state: {feedback}});
    }

    function handleSelect(chosen) {
        if (!completed.includes(chosen)){
            completed.push(chosen);
            setCompleted(completed);
            console.log(completed);
        }
    }

    function printCompleted() {
        let result = "";
        let i = 0;
        for (; i<completed.length; i++) {
            result += completed[i] + "";
        }
        console.log(completed);
        return completed.length;
    }

    async function reqeustCourses(){
        const data = {};
       // console.log(data);

        let feedback = await fetch('http://localhost:8080/course/list', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        
        if(feedback.result===1){
            console.log("Course list fetching succeeded...");
            setCourseOptions(feedback.courses);
            courseOptions.sort();
            // console.log(feedback);
        }
        else{          
            setMsg("");
            setHeader("Please try again...");
            setPopout(true);
            console.log("Course list fetching failed...");
        }
    } 

    async function handleContinue(){
        const data = {stream, preference, completed};
        console.log(data);

        let feedback = await fetch('http://localhost:8080/getrecommend', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        console.log(feedback);
        
        if(feedback.result===1){
            console.log("operation succeeded");
            
            navigate('/home', {state: {user, feedback}});
        }
        else{
            
            setMsg("");
            setHeader("operation failed");
            setPopout(true);

            console.log("operation failed");

        }
    
    } 

    return(
        <div>
            <div className='box'>
                
                <div class="streamDivHistory" style={{left:"-20em",top:"-1em"}}>
                    <h2 class="scoreHeader"> Please provide your stream: </h2>
                    <input 
                        type = "stream" 
                        className='streamInputHistory' 
                        onChange={updateStream} 
                        placeholder="Your stream here"
                        style={{left:"3em",top:"1.5em"}}
                    />
                </div>

                <div class="preferenceDivHistory" style={{left:"-5em",top:"-4em"}}>
                    <h2 class="commentHeader"> Tell us about your preference: </h2>
                    <input 
                        type = "preference" 
                        className='preferenceInputHistory' 
                        onChange={updatePreference}  
                        placeholder='separate the inputs with "|", e.g. "Python|Java|C++"'
                        style={{left:"-4.6em",top:"1.5em"}}
                    />
                </div>   
                
                <div class="coursesDivHistory" style={{left:"-6em",top:"-7em"}}>
                    <div class="coursesSubDivHistory">
                        <h2> Select the courses that you have completed: </h2>
                        
                        <Select 
                            style={{position:"relative",left:"2em",top:"1em"}} 
                            label="course" 
                            onChange={(e)=>handleSelect(e.target.value)} 
                            sx={{minWidth:200}} 
                        >
                            {testingCourseOptions.map((courseOption) => (
                                <MenuItem
                                    key={courseOption}
                                    value={courseOption}
                                >
                                {courseOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        {printCompleted()}
                    </div>

                </div>

                <div className="buttonsHistory">
                    <Button text = "Cancel" col="steelblue" func={handleCancel}></Button>
                    <Button text = "Continue" col="steelblue" func={handleContinue}></Button>
                </div>

            </div>

            <Popout trigger ={popout} head = {header} message={msg} setTrigger={setPopout}/>
        </div>
    )
}

export default History;

