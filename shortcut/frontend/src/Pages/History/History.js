import './History.css';


//import Button from '../../Components/Button';
import * as React from 'react';
import { useParams, Link, Routes, Route, BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import {Button, OutlinedInput,Box,Paper, InputLabel, FormControl, Chip, Select, MenuItem} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState, useEffect } from "react";
import Popout from '../../Components/Popout';

import {light, dark} from "../../Components/Themes";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


const History =()=> {

    const [mode, setMode]=useState(JSON.parse(localStorage.getItem('mode')));
    const [refresh, setRefresh] = useState(false);
    function re_render(){
        setRefresh(!refresh);
    }
    useEffect(()=> setMode(JSON.parse(localStorage.getItem('mode'))), [refresh]);
    

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
    let testingCourseOptions =  [
        "AFSA01H3",
        "CSCD43H3",
        "CSCD27H3",
        "CSCD25H3"
    ]
;
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
        if (!completed.includes(chosen.target.value)){
            completed.push(chosen.target.value);
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
        return result;
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
      
        
   
            
        setCourseOptions(feedback.courses);
        courseOptions.sort();
        console.log(courseOptions);
            
    }
     
    const [loading, setLoading]=useState(false);
    async function handleContinue(){
        

        if(stream.length<=0){
            setPopout(true);
            setHeader("Submission Failed");
            setMsg("Please complete all questions");
            
            return;
        }
        setLoading(true);
        const data = {stream, preference, completed};
        console.log(data);

        let feedback = await fetch('http://localhost:8080/getrecommand', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        console.log(feedback);
        setLoading(false);
        
       
        navigate('/result', {state: {user, feedback}});
        
    
    } 
    const ITEM_HEIGHT = 50;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 250,
          },
        },
    };
    const ITEM_HEIGHT2 = 20;
    const MenuProps2 = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT2 * 4.5,
            width: 200,
          },
        },
    };

    return(
        <ThemeProvider theme={mode? dark:light}>
            <CssBaseline/>
        <div style={{display:"flex", flexDirection:"column"}}>
            <h1 style={{marginTop:"2em"}}>Your Academic History Form</h1>
            <p style={{color:"blue"}}>Currently, this feature only available to Specialist Computer Science student</p>
            <div>&nbsp;</div>
            <Paper style={{width:"85%", minHeight:"120vh"}} sx={{bgcolor:"background.paper.box"}}  >
                
                <div style={{margin:"4em"}} >
                    <h2 > Please provide your stream: </h2>
                    <Select 
                        
                        label="course" 
                        onChange={(e)=>setStream(e.target.value)} 
                        sx={{minWidth:300}} 
                        MenuProps={MenuProps2}
                    >
                        <MenuItem sx={{bgcolor:"background.paper.primary"}}  value={"Comprehensive"}>Comprehensive</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value={"Software Engineering"}>Software Engineering</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value={"Information Systems"}>Information Systems</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value={"Entrepreneurship"}>Entrepreneurship</MenuItem>
                    </Select>
                </div>
        

                <div style={{margin:"4em"}}>
                &nbsp;
                    <h2 > Tell us about your preference: </h2>
                    
                    <input 
                        type = "preference" 
                        style={{width:"40%", height:"2.5em"}}
                        onChange={updatePreference}  
                        placeholder='Separate the inputs with "|", e.g. "Python|robot"'
                        
                    />
                </div>   
                
                <div >
                    <div style={{margin:"4em"}}>
                        &nbsp;
                        
                        
                            <h2> Select the courses that you have completed: </h2>
                           
                            <Select
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                
                                sx={{width:"60%"}} 
                                value={completed} 
                                onChange={handleSelect}
                                renderValue={(selected)=>(
                                <Box >
                                    {selected.map((value)=>(
                                        <Chip key={value} label={value}/>
                                    ))}
                                </Box>
                            )} MenuProps={MenuProps}>
                            {                      
                                courseOptions.map((course)=>
                                    <MenuItem  sx={{bgcolor:"background.paper.primary"}} key={course} value={course}>
                                    {course}
                                    </MenuItem>)
                            }          
                            </Select>
                                            
                    </div>
                </div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div><div>&nbsp;</div>
                <div>&nbsp;</div><div>&nbsp;</div>
                <div style={{width:"30%", gap:"10em", display:"flex", flexDirection:"row"}}>
                    {/*<Button text = "Cancel" col="steelblue" func={handleCancel}></Button>
                    <Button text = "Continue" col="steelblue" func={handleContinue}></Button> */}
                    <Button onClick={handleCancel} variant="contained" > Cancel</Button>
                    <LoadingButton loading={loading} onClick={handleContinue} variant="contained"> Continue</LoadingButton>
                    
                </div>

            </Paper>

            <Popout trigger ={popout} head = {header} message={msg} setTrigger={setPopout}/>
        </div> </ThemeProvider>
    )
}

export default History;
