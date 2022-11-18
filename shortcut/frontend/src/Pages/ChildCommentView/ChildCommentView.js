import './ChildCommentView.css';
import Popout from '../../Components/Popout';

import Button from '../../Components/Button';
import * as React from 'react';
import {Link, Routes, Route, BrowserRouter as Router, useNavigate, useLocation, useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";
import { requirePropFactory } from '@mui/material';
import Navbar from '../../Components/Navbar';


import {light, dark} from "../../Components/Themes";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Paper} from '@mui/material';

const ChildCommentView =()=> {
    let navigate = useNavigate();

    // popout for error msg 
    const [msg, setMsg] = useState('');
    const [header, setHeader] = useState('');
    const [popout, setPopout] = useState(false);
    const [childData, setChildData] = useState(
        {"ratings":[{"anonymity":false, "comment":"", "course":"", "created":"", "email":"", "score":0, username:"Loading...", "__v":0, "_id":""}], 
        "comments":[{"anonymity":false, "likedEmails":[], "dislikedEmails":[], "content":"Loading...", "course":"", "created":"", "email":"", "parent":null, username:"Loading...", "__v":0, "_id":""}], 
        "message":"sample message",
        "names":[],
        "result":1});
    const {state} = useLocation();
    const user = state.user;
    const email = user.email.data;
    const parent_id = state.commentId;

    const{code}=useParams();
    console.log(code);
    const [course, setCourse]=useState(code);

    const [currentPage, setCurrentPage] = useState(1);
    const maxCommentPerPage = 4;

    console.log(childData);

    useEffect(()=> {reqeustChildComments(parent_id)}, []);
    

    // light, dark mode
    const [mode, setMode]=useState(JSON.parse(localStorage.getItem('mode')));
    const [refresh, setRefresh] = useState(false);

    function re_render(){
        setRefresh(!refresh);
       
    }
    useEffect(()=> setMode(JSON.parse(localStorage.getItem('mode'))), [refresh]);
    // done mode

    const back =()=>{
   
        navigate(-1, {state: {user}});
    }

    const home =()=>{

        navigate('/home', {state: {user}});
    }    
    function toProfile(){
        navigate('/profile', {state:{user}});
    }

    const prevPage =()=> {
        const length = childData.comments.length;
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage =()=> {
        const length = childData.comments.length;
        if (currentPage*maxCommentPerPage < length) {
            setCurrentPage(currentPage + 1);
        }
    }

    function handleLike(commentId,index) {
        likeOrNot(commentId);
    }

    function handleDislike(commentId) {
        dislikeOrNot(commentId);
    }

    function renderReply(index) {
        const comment = childData.child_comments[index];
        const anonymity = comment.anonymity;
        const commentId = comment._id; 
        let username = "Anonymous User"
        if (anonymity == false) {
            username = childData.names[index];
        }
        const content = comment.content;

        let isLiked = false;
         for (let j=0; j<comment.likedEmails.length;j++) {
             if (email == comment.likedEmails[j]) {
                 isLiked = true;
                 break;
             }
        }
        let numberOfLikes = comment.numLikes;
        let likeButtonText = "Like"
        let likeButtonClass = "likeButtonCV";
        if (isLiked) {
            likeButtonText = "Cancel like"
        }

        let isDisliked = false;
         for (let j=0; j<comment.dislikedEmails.length;j++) {
             if (email == comment.dislikedEmails[j]) {
                 isDisliked = true;
                 break;
             }
        }
        let numberOfDislikes = comment.numDislikes;
        let dislikeButtonText = "Dislike"
        let dislikeButtonClass = "dislikeButtonCV";
        if (isDisliked) {
            dislikeButtonText = "Cancel dislike"
        }

        return (
        <Paper sx={{bgcolor:"background.paper.comments"}}className='commentDivCV'>
            <div style={{position:"relative",width:"105%"}}>
                <img 
                    src={require("../../Images/defaultUserAvatar.png")} 
                    style={{width: "2em",position:"relative",top:"0.6em"}}
                />
                &nbsp;&nbsp;
                {username}
                <button className={likeButtonClass} 
                style={{position:"relative",left:"5em",margin:"0em 0.7em 0em 0em"}} 
                onClick={() => handleLike(commentId,index)}>
                    {likeButtonText}({numberOfLikes})
                </button>
                <button className={dislikeButtonClass} 
                style={{position:"relative",left:"5em",margin:"0em 0.7em 0em 0em"}} 
                onClick={() => handleDislike(commentId)}>
                    {dislikeButtonText}({numberOfDislikes})
                </button>
            </div>
            <div style={{margin:"1.1em 0em 0.6em 1em"}}>
                {content}
            </div>
        </Paper>)
    }

    function renderReplies(currentPage) {

        let result = [(
            <h2 style={{float:"left",width:"90em",margin:"1em 1em 0.2em 1em"}}>
              Replies:
            </h2>
          )];
        for (let i=0; (i<maxCommentPerPage)&&(i<childData.names.length-(currentPage-1)*maxCommentPerPage); i++) {
            result.push(renderReply((currentPage-1)*maxCommentPerPage+i));
            //console.log("Pushed",(currentPage-1)*maxCommentPerPage+i);
        }
        return result;
    }

    async function reqeustChildComments(parent_id){
        const data = {parent_id};
        console.log(data);

        let feedback = await fetch('http://localhost:8080/seeRatingComments', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        setChildData(feedback);
        
        if(feedback.result===1){
            console.log("Child fetching succeeded...");
        }
        else{          
            setMsg("");
            setHeader("Child Fetching failed");
            setPopout(true);
            console.log("Child fetching failed...");
        }
    } 

    async function likeOrNot(_id){
        const data = {email, _id};
       // console.log(commentId);
        console.log(data);

        let feedback = await fetch('http://localhost:8080/like', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        
        if(feedback.result!=0){
            console.log("Operation succeeded...");
            reqeustChildComments(parent_id);
            // console.log(feedback);
        }
        else{          
            console.log("Operation failed...");
        }
    } 

    async function dislikeOrNot(_id){
        const data = {email, _id};
       // console.log(commentId);
       // console.log(data);

        let feedback = await fetch('http://localhost:8080/dislike', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        
        if(feedback.result!=0){
            console.log("Operation succeeded...");
            reqeustChildComments(parent_id);
            // console.log(feedback);
        }
        else{          
            console.log("Operation failed...");
        }
    }  

    return(
        <ThemeProvider theme={mode ? dark:light}>
            <CssBaseline/>
        <div >
            <Navbar toHome={home} toProfile={toProfile} sendState={re_render}/>
            <Paper sx={{bgcolor:"background.paper.third"}} className="boxCV">

                <div className="courseHeaderCV" style={{top:"2em"}}>
                    <h1 style={{fontSize:"3.5em"}}>{course}</h1>
                </div>

                <div style={{fontSize:"2em", position:"relative", top:"2em"}}>
                    "{state.content.substring(0, 70)}"
                </div>

                <Paper sx={{bgcolor:"background.paper.comments"}}className='commentsDivCV'>
                    {renderReplies(currentPage)}
                    <div className='pageButtonsCV'>
                        <button onClick = {prevPage}> prev </button>
                        &nbsp; Page {currentPage} &nbsp;
                        <button onClick = {nextPage}> next </button>
                    </div>
                </Paper>

                <div className="buttonsCV">
                    <Button text = "Back" col="steelblue" func={back}></Button>
                    
                </div>
            </Paper>

            <Popout trigger ={popout} head = {header} message={msg} setTrigger={setPopout}/>
        </div></ThemeProvider>
    )
}

export default ChildCommentView;
