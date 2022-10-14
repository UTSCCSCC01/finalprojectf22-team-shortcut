import React from "react";
import { useState, useEffect} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import {Accordion, AccordionSummary, Table, TableHead, TableBody, TableCell, Card, CardContent, CardMedia, Collapse, Paper, InputBase, IconButton, Divider, MenuList, MenuItem, ListItemText} from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import {MdExpandMore} from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import Button from "../../Components/Button";
import Popout from "../../Components/Popout";


const CourseDescription =()=>{

    let navigate = useNavigate();
    const{code}=useParams();

    const {state} = useLocation();
    const user = state.user;

    const [popout, setPopout] = useState(false);
    const[header, setHeader] = useState('');
    
    const [name, setName] = useState('');
    const [description, setDescription]=useState('');
    const [breadth, setBreadth]=useState('');
    const [pre, setPre]=useState([]);
    const [exclusions, setExclusions]=useState([]);
    const [core, setCore]=useState([]);
    const [recommended, setRecommended] = useState([]);
    const [notes, setNotes]= useState('');
    const [status, setStatus] = useState('');
    
    function toProfile(){
        navigate('/profile', {state:{user}});
    }
    function toHome(){
        navigate('/home', {state:{user}});
    }

    function toRate(){
        navigate(`/course/${code}/commentForm`, {state:{user}});
    }
    
    async function fetchData(){
        const data = {code};
        let feedback = await fetch('http://localhost:8080/display', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();

        
        
        if(feedback.check===0){
            // no program found
            console.log("error");
            setHeader("Error Occured. No course found.");
            setPopout(true);
 
        }
        else{
            // program found
            
            setDescription(feedback.course.description);
            setBreadth(feedback.course.breadth);
            setExclusions(feedback.course.exclusions);
            setPre(feedback.course.prerequisites);
            setCore(feedback.course.corequisites);
            setRecommended(feedback.course.recommended);
            setNotes(feedback.course.notes);
            setStatus(feedback.course.status);
            setName(feedback.course.name);
           
          
        }
    }

    useEffect(()=> {fetchData()}, [])

    return(
        <div style={{backgroundColor:"white"}}> 
        <Navbar toHome={toHome} toProfile={toProfile}/>
        <h1 style={{textAlign:"center", margin:"2em"}}>{code}: {name}</h1>
        
        
        <Accordion style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Course Description</h3>
            </AccordionSummary>
            <AccordionDetails>
             <p>{description}</p> 
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Course Breadth</h3>
            </AccordionSummary>
            <AccordionDetails >
                <p>{breadth}</p>
            </AccordionDetails>
        </Accordion>



        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Course Exclusions</h3>
            </AccordionSummary>
            <AccordionDetails >
                {exclusions.map((item)=>(
                    <p> - {item}</p>
                ))
                }
            </AccordionDetails>
        </Accordion>
        
        <Accordion   style={{ marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Course Pre-Requisites</h3>
            </AccordionSummary>
            <AccordionDetails >
                {pre.map((item)=>(
                    <p> - {item}</p>
                ))}
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Course Co-Requisites</h3>
            </AccordionSummary>
            <AccordionDetails >
                {core.map((item)=>(
                    <p> - {item}</p>
                ))}
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Recommendation</h3>
            </AccordionSummary>
            <AccordionDetails >
                {recommended.map((item)=>(
                    <p> - {item}</p>
                ))

                }
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Course Notes</h3>
            </AccordionSummary>
            <AccordionDetails >
                <p>{notes}</p>
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Course Status</h3>
            </AccordionSummary>
            <AccordionDetails >
                <p>{status}</p>
            </AccordionDetails>
        </Accordion>

        <div style={{display:"flex", flexDirection:"row", margin:"3em"}}>

        <Button func={toRate} text="I want to Rate this course" col="steelblue"></Button>
        <Button text="I want to see others' comments" col="steelblue"></Button>
        </div> 
        <Popout trigger = {popout} head = {header} setTrigger={setPopout}/>
        </div>
    )





   
}
export default CourseDescription;