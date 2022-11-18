import './ChildCommentForm.css';


import Button from '../../Components/Button';
import * as React from 'react';
import { useParams, Link, Routes, Route, BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';


import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Popout from '../../Components/Popout';
import Logo from "../../Components/Logo";

import {light, dark} from "../../Components/Themes";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Paper} from "@mui/material";


const ChildCommentForm =()=> {
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
    //  console.log(code);

    const [course, setCourse] = useState(code);
    const [comment, setComment] = useState("");
    const [id, setId] = useState(state.commentId);
    const [anonymity, setAnonymity]= useState(false);

     console.log(comment);
     console.log(anonymity);
     console.log(state.user.email.data);
     console.log(id);
     console.log(course);


    // light, dark mode
    const [mode, setMode]=useState(JSON.parse(localStorage.getItem('mode')));
    const [refresh, setRefresh] = useState(false);

    function re_render(){
        setRefresh(!refresh);
       
    }
    useEffect(()=> setMode(JSON.parse(localStorage.getItem('mode'))), [refresh]);
    // done mode
    const changeComment=(val)=>{
        setComment(val.target.value);
    }

    const changeAnonymity=()=>{
        setAnonymity(!anonymity);
    }

    const handleCancel =()=>{
        navigate(-1, {state: {user}});
    }

    async function submit(){
        const data = {email, course, id, comment, anonymity};
        console.log(data);

        let feedback = await fetch('http://localhost:8080/comment', {
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
        <ThemeProvider theme={mode ? dark:light}>
            <CssBaseline/>
        <div>
            <Logo/>
            
            <Paper sx={{bgcolor:"background.paper.third"}} className='box'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <div class="contentDivCCF">
                    <h2 class="commentHeader"> Replying to: </h2>
                    &nbsp;
                    <h5 class="" style={{"width":"50em", "position":"relative", "left":"1em"}}> "{state.content.substring(0,70)}" </h5>
                </div>   

                <div class="commentDivCCF">
                    <h2 class="commentHeader"> Compose a reply here: </h2>
                    <textarea className="commentInput"  maxLength={1000} placeholder={"Leave your comment here..."} onChange={changeComment}/>
                </div>   
                
                <div class="anonymityDivCCF">
                    <h2> Do you want this reply to be anonymous? </h2>
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

            </Paper>

            <Popout trigger ={popout} head = {header} message={msg} setTrigger={setPopout}/>
        </div></ThemeProvider>
    )
}

export default ChildCommentForm;
