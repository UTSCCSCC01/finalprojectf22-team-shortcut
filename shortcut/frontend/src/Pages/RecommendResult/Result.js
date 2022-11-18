import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";

import { useNavigate, useLocation } from "react-router-dom";
import {Grid, Button, Select, InputLabel, Fade, Popper, Box, Card, Paper} from '@mui/material';

import {light, dark} from "../../Components/Themes";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


const Result =()=>{
    let navigate=useNavigate();
    const {state} =useLocation();
    const user=state.user;
    
    
    const completed = state.feedback.completed;
    const student_academic_history=state.feedback.completed;
    const required = state.feedback.required;
    const electives = state.feedback.electives

    
    const required_A = required.A;
    const required_B = required.B;
    const required_C = required.C;
    const required_D = required.D;

    const electives_A = electives.A;
    const electives_B = electives.B;
    const electives_C = electives.C;
    const electives_D = electives.D;


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


    const [code, setCode]=useState('');
    const [pre, setPre] = useState([]);
    const [message, setMessage]=useState('');
    // popout components
    const [pop, setPop]=useState(false);
    const [place, setPlace]=useState(null);

   

    const handlePop=(e)=>{
        
        
        if(pop){
            setPop(!pop);
            setPre([]);
            setMessage('');
        }
        else{
            setPop(!pop);
            
            setPlace(e.currentTarget);
            handleSubmit();
        }
        
        
    }
    // popout done

    function fetchArray(array){
        if(array && array.length>0){
  
            const new_array = array.map(item=>{
                console.log(item);
                if(Number.isInteger(item) && item){
                    return "Need satisfy all below: "
                }
                else if(Number.isInteger(item) && item===0){
                    return "Satisfy one of the requirements: "
                }
                
                else if(Array.isArray(item)){
                    return " ["+fetchArray(item)+"]";
                }      
                else{
                    return " "+item;
                }
                
                
            })

            console.log(new_array);
            return new_array;
        }
        else{
            return [];
        }

    }
    
    async function handleSubmit(e){
        const code =e.target.value;
        const data = {student_academic_history, code};
        console.log(data);

        if(pop){
            setPop(false);
            setPre([]);
            setMessage("");
            return;
        }
        setPop(true);
        setPlace(e.currentTarget);
        let feedback = await fetch('http://localhost:8080/checkPrerequisites', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
       

        console.log(feedback);
       
        if(feedback.result===0){
            // error
            setMessage("Sorry, error occurred");            
        }
        else if(feedback.result===1){
            
            setMessage("You are fully eligible for this course now");
        }
        else if(feedback.result===3){
            setMessage("You have already finish this course");
        }
        else{
            setMessage("You are missing some requirements to take this course")
            setPre(fetchArray(feedback.Prerequisites));
          
        }

    } 

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
                    
                    <Button value={course} onClick={handleSubmit} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  require         
                    </Button>
                    
                    ))}
                    {electives_A.map((course)=>(
                    <Button value={course} onClick={handleSubmit} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  recommend           
                    </Button>
                    ))}
                    </Paper>


                <Paper style={{maxWidth:"80%"}}>
                    <h2 style={{margin:"1em"}}>Recommended B-Level Courses</h2>
                
                    {required_B.map((course)=>(
               
                    <Button value={course} onClick={handleSubmit} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  require         
                    </Button>

                    ))}
                    {electives_B.map((course)=>(
                    <Button value={course} onClick={handleSubmit} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  recommend           
                    </Button>
                    ))}
                 
            </Paper>

            <Paper style={{maxWidth:"80%",flexDirection:"row", diplay:"flex"}}>
                <h2 style={{margin:"1em"}}>Recommended C-Level Courses</h2>
                
                    {required_C.map((course)=>(
                    <Button value={course} onClick={handleSubmit} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  require         
                    </Button>
                    ))}
                    {electives_C.map((course)=>(
                    <Button value={course} onClick={handleSubmit} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  recommend           
                    </Button>
                    ))}
                 
            </Paper>

            <Paper style={{maxWidth:"80%",flexDirection:"row", diplay:"flex"}}>
                <h2 style={{margin:"1em"}}>Recommended D-Level Courses</h2>
                
                    {required_D.map((course)=>(
                    <Button value={course} onClick={handleSubmit} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  require         
                    </Button>
                    ))}
                    {electives_D.map((course)=>(
                    <Button value={course} onClick={handleSubmit} color="secondary" variant="outlined" style={{margin:"0.1em",width:"8em"}}>
                        {course}  recommend           
                    </Button>
                    ))}
                 
            </Paper>

            <Popper placement="bottom" anchorEl={place} open={pop}  transition>
                   {({TransitionProps})=>(
                       <Fade timeout={330} {...TransitionProps}>
                           <Paper sx={{bgcolor:"background.paper.primary"}} style={{minWidth:"30em", maxWidth:"50em"}}>                               
                                
                                <h3 style={{margin:"0.8em",color:"green", textAlign:"center"}}>{message}</h3>
                                
                               {pre.map((item)=>(
                                <p style={{marginLeft:"1em"}}>{item.toString().replaceAll(",", "/")}</p>
                               ))}
                               &nbsp;
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