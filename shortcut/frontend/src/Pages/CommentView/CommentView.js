import './CommentView.css';
import Popout from '../../Components/Popout';
import Logo from "../../Components/Logo";

import Button from '../../Components/Button';
import * as React from 'react';
import { Link, Routes, Route, BrowserRouter as Router, useNavigate, useLocation, useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";
import { requirePropFactory } from '@mui/material';
import Navbar from '../../Components/Navbar';

const CommentView =()=> {
    let navigate = useNavigate();

    // popout for error msg 
    const [msg, setMsg] = useState('');
    const [header, setHeader] = useState('');
    const [popout, setPopout] = useState(false);
    const [parentData, setParentData] = useState(
        {"ratings":[{"anonymity":false, "comment":"", "course":"", "created":"", "email":"", "score":0, username:"Loading...", "__v":0, "_id":""}], 
        "comments":[{"anonymity":false, "content":"Loading...", "course":"", "created":"", "email":"", "parent":null, username:"Loading...", "__v":0, "_id":""}], 
        "message":"sample message",
        "result":1});
    const {state} = useLocation();
    const user = state.user;

    const{code}=useParams();
    console.log(code);
    const [course, setCourse]=useState(code);
    
    const [currentPage, setCurrentPage] = useState(1);
    const maxCommentPerPage = 4;

    console.log(parentData);

    useEffect(()=> {reqeustParentComments()}, []);


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
        const length = parentData.comments.length;
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage =()=> {
        const length = parentData.comments.length;
        if (currentPage*maxCommentPerPage < length) {
            setCurrentPage(currentPage + 1);
        }
    }

    function calcOverallScore() {
        const ratings = parentData.ratings
        let i = 0;
        let totalScore = 0;
        for (; i < ratings.length; i++) {
            totalScore += ratings[i].score;
        }
        return (totalScore/i).toFixed(2);
    }

    function renderComment(index) {
        const rating = parentData.ratings[index];
        const comment = parentData.comments[index];
        const anonymity = rating.anonymity;
        let username = "Anonymous User"
        if (anonymity == false) {
            username = rating.username;
        }
        const score = rating.score;
        const content = comment.content;

        return <div className='commentDivCV'>
            <img 
                src={require("../../Images/defaultUserAvatar.png")} 
                style={{width: "2em",position:"relative",top:"0.6em"}}
            />
            &nbsp;&nbsp;
            {username}
            <div style={{margin:"0.4em 0em 0em 0em"}}>
                <Rating value={score} precision={0.5} readOnly size='small'/>
            </div>
            <div style={{margin:"0.3em 0em 0.6em 1em"}}>
                {content}
            </div>
        </div>
    }

    function renderComments(currentPage) {
        let result = [(
            <h2 style={{float:"left",width:"90em",margin:"1em 1em 0.2em 1em"}}>
              Comments:
            </h2>
          )];
        for (let i=0; (i<maxCommentPerPage)&&(i<parentData.ratings.length-(currentPage-1)*maxCommentPerPage); i++) {
            result.push(renderComment((currentPage-1)*maxCommentPerPage+i));
            console.log("Pushed",(currentPage-1)*maxCommentPerPage+i);
        }
        return result;
    }


    async function reqeustParentComments(){
        const data = {course};
       // console.log(data);

        let feedback = await fetch('http://localhost:8080/seeCourseRatings', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        setParentData(feedback);
        
        if(feedback.result===1){
            console.log("Parent fetching succeeded...");
            // console.log(feedback);
        }
        else{
            
            setMsg("");
            setHeader("Parent Fetching failed");
            setPopout(true);

            console.log("Parent fetching failed...");

        }
    
    } 

    return(
        <div style={{backgroundColor:"white"}}>
            <Navbar toHome={home} toProfile={toProfile}/>
            <div className="boxCV">
                <div className="courseHeaderCV" style={{top:"2em"}}>
                    <h1 style={{fontSize:"3.5em"}}>{course}</h1>
                    <h1 style={{marginLeft:"4em"}}>Rating: {calcOverallScore()}/5</h1>
                </div>
                <div className='commentsDivCV'>
                    {renderComments(currentPage)}
                    <div className='pageButtonsCV'>
                        <button onClick = {prevPage}> prev </button>
                        &nbsp; Page {currentPage} &nbsp;
                        <button onClick = {nextPage}> next </button>
                    </div>
                </div>

                <div className="buttonsCV">
                    <Button text = "Back" col="steelblue" func={back}></Button>
                    
                </div>
            </div>

            <Popout trigger ={popout} head = {header} message={msg} setTrigger={setPopout}/>
        </div>
    )
}

export default CommentView;
