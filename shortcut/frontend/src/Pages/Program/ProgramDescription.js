import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import {Divider, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import {MdExpandMore} from "react-icons/md";

import Popout from "../../Components/Popout";

import bottom1 from "../../Images/quote4.jpg";
import bottom2 from "../../Images/quote2.jpg";


const ProgramDescription =()=>{
    let navigate=useNavigate();

    const{name}=useParams();

    const {state} =useLocation();
    const user=state.user;
    
    // popout component
    const [popout, setPopout] = useState(false);
    const[header, setHeader] = useState('');

    const [type, setType]=useState('');
    const [area, setArea]=useState('');
    const [degree, setDegree]=useState('');
    const [coop, setCoop]=useState('');
    const [enrolment, setEnrolment]=useState('');
    const [graduation, setGraduation]=useState('');
    const [description, setDescription]=useState('');
    const [notes, setNotes]=useState('');
    const[status, setStatus]=useState('');



    function toProfile(){
        navigate('/profile', {state:{user}});
    }
    function toHome(){
        navigate('/home', {state:{user}});
    }

    async function fetchData(){
        const data = {name};
        let feedback = await fetch('http://localhost:8080/searchprogramname', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        if(feedback.result===0){
            // no program found
            console.log("error");
            setPopout(true);
            setHeader("Error Occured. No program found");
            
        }
        else{
            // program found
            console.log(feedback.item);
            setType(feedback.item[0].type);
            setArea(feedback.item[0].area);
            setDegree(feedback.item[0].degree);
            setDescription(feedback.item[0].description);
            setEnrolment(feedback.item[0].enrolment);
            setCoop(feedback.item[0].coop);
            setGraduation(feedback.item[0].graduation);
            setNotes(feedback.item[0].notes);
            setStatus(feedback.item[0].status);

            
           
          
        }
    }

    // useEffect to send post request
    useEffect(()=> {fetchData()}, [])



    return(
        <div style={{backgroundColor:"white"}}>
        <Navbar toHome={toHome} toProfile={toProfile}/>
        <h1 style={{textAlign:"center", margin:"2em"}}>{name}</h1>
        
        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Program Type</h3>
            </AccordionSummary>
            <AccordionDetails >
                <p>{type}</p>
            </AccordionDetails>
        </Accordion>
        
        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Program Area</h3>
            </AccordionSummary>
            <AccordionDetails >
                <p>{area}</p>
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Program Description</h3>
            </AccordionSummary>
            <AccordionDetails >
                {   
                    description.split('\\n').map((str) =>
                        <div><p>{str}</p></div>)
                }
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Degrees</h3>
            </AccordionSummary>
            <AccordionDetails >
                <p>{degree}</p>
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Co-operative</h3>
            </AccordionSummary>
            <AccordionDetails >
                {   
                    coop.split('\\n').map((str) =>
                        <div><p>{str}</p></div>)
                }
            
            </AccordionDetails>
        </Accordion>
        
        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Program Enrolment</h3>
            </AccordionSummary>
            <AccordionDetails >
                
                {   
                    enrolment.split('\\n').map((str) =>
                        <div><p>{str}</p></div>)
                }
                
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Graduation</h3>
            </AccordionSummary>
            <AccordionDetails >

                {   
                    graduation.split('\\n').map((str) =>
                        <div><p>{str}</p></div>)
                }
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Program Notes</h3>
            </AccordionSummary>
            <AccordionDetails >
                <p>{notes}</p>
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Program Status</h3>
            </AccordionSummary>
            <AccordionDetails >
                <p>{status}</p>
            </AccordionDetails>
        </Accordion>
        
        <Popout trigger = {popout} head = {header} setTrigger={setPopout}/>

        <div> &nbsp;</div>
        <div> &nbsp;</div>
        <div style={{display:"flex", backgroundColor:"whitesmoke"}}>
        <img style={{width: "40%", height: "55%"}} src={bottom1}/>
        <img style={{width: "40%", height: "45%"}} src={bottom2}/>
        </div>
        
        </div>
    )

}

export default ProgramDescription;