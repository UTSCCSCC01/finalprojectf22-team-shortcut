import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import "./GeneralCourse.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Table, TableHead, TableBody, TableCell, Card, CardContent, CardMedia, Collapse, Paper, InputBase, IconButton, Divider, MenuList, MenuItem, ListItemText} from '@mui/material';

// icons
import { ImFilter } from "react-icons/im";
import { GrSearchAdvanced, GrMore } from "react-icons/gr";
import {RiFilter, RiFilterLine} from "react-icons/ri";

import A from "../../Images/b17.jpg";
import B from "../../Images/b15.jpg";
import C from "../../Images/b16.jpg";
import D from "../../Images/b14.jpg";
import b9 from "../../Images/b9.jpg";

// corse disctionary keyword
var courses = require("./CourseDictionary.json");

const GeneralCourse =()=>{
    // get user data
    let navigate=useNavigate();
    const {state} =useLocation();
    const user=state.user;

    // info card button
    const [a, setA]=useState(false);
    const [b, setB]=useState(false);
    const [c, setC]=useState(false);
    const [d, setD]=useState(false);

    const [search, setSearch]=useState('');
    const [search_result, setSearchResult]=useState(0);

    
    const [courseList, setCourseList]=useState([]);
    
    function toProfile(){
        navigate('/profile', {state:{user}});
    }
    function toHome(){
        navigate('/home', {state:{user}});
    }
    function toDescription(code){
        
        navigate(`/course/${code}`, {state:{user}});
        console.log(user);
    }
   

    async function submitSearch(){
        // submit keyword to backend
        const keywords=search;
        const data = {keywords};
        let feedback = await fetch('http://localhost:8080/search', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        if(feedback.check===0){
            // no course found
            // console.log(feedback);
            setSearchResult(-1);
        }
        else{
            // course found
            setSearchResult(1);
            setCourseList(feedback.a);
            
        }


    }
    

    return (
        
        <div style={{backgroundColor: "white"}}>
        <Navbar toProfile={toProfile} toHome={toHome}/>
        <h1 style={{fontSize:"3em", textAlign:"center", margin:"1.5em", color:"darkred"}}>
            Find Your Desired Courses</h1>
            <Paper style={{flexDirection:"row", display:"flex", backgroundColor:"lavender", height:"25em"}}>
        
        <Card sx={{maxWidth: 200}}> 
        <CardMedia component="img" image={A}></CardMedia>
        <CardContent>
            <h3>Breadth?</h3>
            <IconButton onClick={()=>{setA(!a)}}>
                <GrMore/>
            </IconButton>
            </CardContent>
            <Collapse in={a} unmountOnExit >
            <CardContent >
            <p > Category to which the course belongs. </p>
            </CardContent>
            </Collapse>
        </Card>

        <Card sx={{maxWidth: 200}}> 
        <CardMedia component="img" image={B}></CardMedia>
        <CardContent>
            <h3>Pre-Requisite?</h3>
            <IconButton onClick={()=>{setB(!b)}}>
                <GrMore/>
            </IconButton>
            </CardContent>
            <Collapse in={b} unmountOnExit >
            <CardContent >
            <p >A course you need to take before you are qualified to take this one.</p>
            </CardContent>
            </Collapse>
        </Card>

        <Card sx={{maxWidth: 200}}> 
        <CardMedia component="img" image={C}></CardMedia>
        <CardContent>
            <h3>Co-Requisite?</h3>
            <IconButton onClick={()=>{setC(!c)}}>
                <GrMore/>
            </IconButton>
            </CardContent>
            <Collapse in={c} >
            <CardContent >
            <p >A course you must take at the same time as this course. </p>
            </CardContent>
            </Collapse>
        </Card>

        <Card sx={{maxWidth: 200}}> 
        <CardMedia component="img" image={D}></CardMedia>
        <CardContent>
            <h3>Exclusions?</h3>
            <IconButton onClick={()=>{setD(!d)}}>
                <GrMore/>
            </IconButton>
            </CardContent>
            <Collapse in={d} unmountOnExit >
            <CardContent >
            <p >A course with content too similar to another for credit to be given to both.</p>
            </CardContent>
            </Collapse>
        </Card>
        

        </Paper> <h1 style={{textAlign:"center", margin:"1.3em"}}>Course Search </h1>
        <Paper component="form"  style={{backgroundColor:"white", width:"60%", height: "50%"}}>
            
            <InputBase style={{width: "80%", height: "8em"}} placeholder="Search..." value={search} onChange={(e)=> setSearch(e.target.value)}> </InputBase>
            
            <IconButton type="button" onClick={submitSearch} sx={{p:"15px"}}>
            <GrSearchAdvanced/>
            </IconButton>
            
            <IconButton type="button" sx={{ p:"15px"}}><ImFilter color="black"/></IconButton>
            <MenuList dense style={{maxHeight:"10em", overflow: "scroll"}}>
                {courses.filter(course=>{
                    const input=search.toLowerCase();
                    const output=course.keyword.toLowerCase();
                    return input && output.startsWith(input) &&input!==output;
                }) 
                .map((course)=>(
                    <div><Divider/>
                        <MenuItem>
                        <ListItemText onClick={()=>setSearch(course.keyword)}
                        sx={{mx:"21em"}}>{course.keyword}</ListItemText>  
                        </MenuItem>                    
                    </div>    
                ))}
            </MenuList>
        
        </Paper>

        {search_result>0 && 
        <Table sx={{maxWidth: "60%"}} >
            <TableHead >
                <TableCell><h3>Course Code</h3></TableCell>
                <TableCell><h3>Course Name</h3></TableCell>
            </TableHead>
            
                {courseList.map((course)=>(
                <TableBody >    
                    <TableCell> <a style={{color:"blue", textDecorationLine:"underline"}} onClick={()=>toDescription(course.code)}>{course.code} </a> </TableCell>
                    <TableCell>{course.name}</TableCell>
                </TableBody>
                ))}
        </Table>
        }

        {search_result<0 &&
            <div>
                <h3 style={{color: "red", textAlign:"center", marginTop:"2em"}}> Sorry, keyword doesn't match any courses</h3>
            </div>
        }


        
        <img style={{ maxWidth: "100%", maxHeight:"50%"}} src={b9}/>
        </div>
    )
}

export default GeneralCourse;
