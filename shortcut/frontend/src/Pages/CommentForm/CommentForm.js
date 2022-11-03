import './CommentForm.css';


import Button from '../../Components/Button';
import * as React from 'react';
import { useParams, Link, Routes, Route, BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';


import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Popout from '../../Components/Popout';
import Logo from "../../Components/Logo";




const CommentForm =()=> {
    let navigate = useNavigate();

    // popout for error msg 
    const [msg, setMsg] = useState('');
    const[header, setHeader] = useState('');
    const [popout, setPopout] =useState(false);
    
    const {state} = useLocation();
    const user = state.user;

    const [email, setEmail] = useState(state.user.email.data);
    const [username, setUsername]=useState(state.user.name.data);

    const{code}=useParams();
    console.log(code);

    const [course, setCourse] = useState(code);
    const [score, setScore] = useState(0);
    // const [difficulty, setDifficulty] = useState(0);
    const [comment, setComment] = useState("");
    const [anonymity, setAnonymity]= useState(false);

    console.log(score);
    
    console.log(comment);
    console.log(anonymity);
    console.log(state.user.email);

    const changeComment=(val)=>{
        setComment(val.target.value);
    }

    const changeAnonymity=()=>{
        setAnonymity(!anonymity);
    }

    const handleCancel =()=>{
        const feedback = state.user
        navigate(-1, {state: {feedback}});
    }

    async function submit(){
        const data = {username, email, course, score, comment, anonymity};
        console.log(data);

        let feedback = await fetch('http://localhost:8080/course/rate', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        console.log(feedback);
        
        if(feedback.result===1){
            console.log("succeed");
            
            navigate(-1, {state: {user}});
        }
        else{
            
            setMsg("");
            setHeader("Submission Failed");
            setPopout(true);

            console.log("failed");

        }
    
    } 

    return(
        <div>
            <Logo/>
            
            <div className='box'>
                
                <div class="scoreDiv">
                    <h2 class="scoreHeader"> Give an overall score for this course: </h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Rating
                        name="simple-controlled"
                        size="large"
                        value={score}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setScore(newValue);
                        }}
                    />
                </div>
                {/*
                <div class="difficultyDiv">
                    <h2 class="scoreHeader"> How difficult this course is: </h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <Rating
                        name="simple-controlled"
                        size="large"
                        value={difficulty}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setDifficulty(newValue);
                        }}
                    />
                    </div> */}

                <div class="commentDiv">
                    <h2 class="commentHeader"> Write your comments: </h2>
                    <textarea className="commentInput"  maxLength={1000} placeholder={"Leave your comment here..."} onChange={changeComment}/>
                </div>   
                
                <div class="anonymityDiv">
                    <h2> Do you want this survey to be anonymous? </h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Checkbox
                        checked={anonymity}
                        onChange={changeAnonymity}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>

                <div className="buttons2">
                    <Button text = "Cancel" col="steelblue" func={handleCancel}></Button>
                    <Button text = "Submit" col="steelblue" func={submit}></Button>
                </div>

            </div>

            <Popout trigger ={popout} head = {header} message={msg} setTrigger={setPopout}/>
        </div>
    )
}

export default CommentForm;
