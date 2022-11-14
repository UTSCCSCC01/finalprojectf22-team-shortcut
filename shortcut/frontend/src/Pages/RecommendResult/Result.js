import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";

import { useNavigate, useLocation } from "react-router-dom";
import {Grid, Button, Select, InputLabel, Fade, Popper, Box, Card, Paper} from '@mui/material';



import {light, dark} from "../../Components/Themes";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PersonalProfile from "../Profile/PersonalProfile";

// for testing
var courses = require("./Test.json");

const Result =()=>{
    let navigate=useNavigate();
    const {state} =useLocation();
    const user=state.user;
    /* comment remove later
    // get user data
    
    const completed = state.feedback.completed;
    const required = state.feedback.required;
    const electives = state.feedback.electives
    */
   

    // for testing, no data now, remove later

    const completed = courses.completed;
    const required_A = courses.required.A;
    const required_B = courses.required.B;
    const required_C = courses.required.C;
    const required_D = courses.required.D;

    const electives_A = courses.electives.A;
    const electives_B = courses.electives.B;
    const electives_C = courses.electives.C;
    const electives_D = courses.electives.D;

    // light, dark mode
    const [mode, setMode]=useState(JSON.parse(localStorage.getItem('mode')));
    const [refresh, setRefresh] = useState(false);

    function re_render(){
        setRefresh(!refresh);
       
    }
    useEffect(()=> setMode(JSON.parse(localStorage.getItem('mode'))), [refresh]);
    


    function toProfile(){
        navigate('/profile', {state:{user}});
    }
    function toHome(){
        navigate('/home', {state:{user}});
    }



    // popout components
    const [pop, setPop]=useState(false);
    const [place, setPlace]=useState(null);
    const handlePop=(e)=>{
        if(pop){
            setPop(!pop);
        }
        else{
            setPop(!pop);
            setPlace(e.currentTarget);
        }
        
        
    }
    // popout done


    /*
    async function handleClick(){
        
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

    } */

    return(
        <ThemeProvider theme={mode? dark:light}>
            <CssBaseline/>
        <div style={{minHeight:"150vh"}}>
            <Navbar toProfile={toProfile} toHome={toHome} sendState={re_render}/>
            <h1 style={{fontSize:"3em", textAlign:"center", margin:"1.5em"}}>
            Recommended Courses for You </h1>
            <div >
            <Paper style={{maxWidth:"80%",flexDirection:"row", diplay:"flex"}}>
                <h2 style={{margin:"1em"}}>Completed Courses</h2>
                {completed.map((course)=>(
                    <Button color="success" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}              
                    </Button>
                ))}
                
            </Paper>
            
            <Paper style={{maxWidth:"80%"}}>
                <h2 style={{margin:"1em"}}>Recommended A-Level Courses</h2>
                
                    {required_A.map((course)=>(
                    
                    <Button onClick={handlePop} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  require         
                    </Button>

                    ))}
                    {electives_A.map((course)=>(
                    <Button onClick={handlePop} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  recommend           
                    </Button>
                    ))}
                    </Paper>


                <Paper style={{maxWidth:"80%"}}>
                    <h2 style={{margin:"1em"}}>Recommended B-Level Courses</h2>
                
                    {required_B.map((course)=>(
               
                    <Button onClick={handlePop} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  require         
                    </Button>

                    ))}
                    {electives_B.map((course)=>(
                    <Button onClick={handlePop} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  recommend           
                    </Button>
                    ))}
                 
            </Paper>

            <Paper style={{maxWidth:"80%",flexDirection:"row", diplay:"flex"}}>
                <h2 style={{margin:"1em"}}>Recommended C-Level Courses</h2>
                
                    {required_C.map((course)=>(
                    <Button onClick={handlePop} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  require         
                    </Button>
                    ))}
                    {electives_C.map((course)=>(
                    <Button onClick={handlePop} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  recommend           
                    </Button>
                    ))}
                 
            </Paper>

            <Paper style={{maxWidth:"80%",flexDirection:"row", diplay:"flex"}}>
                <h2 style={{margin:"1em"}}>Recommended D-Level Courses</h2>
                
                    {required_D.map((course)=>(
                    <Button onClick={handlePop} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  require         
                    </Button>
                    ))}
                    {electives_D.map((course)=>(
                    <Button onClick={handlePop} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  recommend           
                    </Button>
                    ))}
                 
            </Paper>

            <Popper placement="bottom" anchorEl={place} open={pop}  transition>
                   {({TransitionProps})=>(
                       <Fade timeout={330} {...TransitionProps}>
                           <Paper sx={{bgcolor:"background.paper.primary"}} style={{maxWidth:"10em"}}>
                               You are not eligible for this course now!
                           </Paper>
                       </Fade>
                   )}
                   
            </Popper>
            
            </div>
            <div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div>
        </div>

        </ThemeProvider>

    )



}

export default Result;