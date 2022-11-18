import React from "react";
import { useState, useEffect} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import {Accordion, AccordionSummary} from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import {MdExpandMore} from "react-icons/md";
import Button from "../../Components/Button";
import Popout from "../../Components/Popout";

import bottom1 from "../../Images/quote5_transparent.png";
import bottom2 from "../../Images/quote6_transparent.png";

import {light, dark} from "../../Components/Themes";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const CourseDescription =()=>{

    let navigate = useNavigate();
    const{code}=useParams();

    const {state} = useLocation();
    const user = state.user;

    // popout component
    const [popout, setPopout] = useState(false);
    const[header, setHeader] = useState('');
    
    // course info
    const [name, setName] = useState('');
    const [description, setDescription]=useState('');
    const [breadth, setBreadth]=useState('');
    const [pre, setPre]=useState([]);
    const [exclusions, setExclusions]=useState([]);
    const [core, setCore]=useState([]);
    const [recommended, setRecommended] = useState([]);
    const [notes, setNotes]= useState('');
    const [status, setStatus] = useState('');
    const [score, setScore]=useState("NaN");

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

    function toRate(){
        navigate(`/course/${code}/commentForm`, {state:{user}});
    }

    function toViewRate(){
        navigate(`/course/${code}/commentView`, {state:{user}});
    }



    function fetchArray(array){
        
        if(array && array.length>0){
  
            const new_array = array.filter(item=>!Number.isInteger(item))
            .map(item=>{
      
                if(Array.isArray(item)){
                    return " ["+fetchArray(item)+"]";
                }              
                else{
                    return " "+item;
                }   
            })

            console.log(new_array);
            return new_array.toString();
        }
        else{
            return "";
        }
        /*
        if(array && array.length>0){
  
            const new_array = array.map(item=>{
                console.log(item);
                if(Number.isInteger(item) && item){
                    return "Need satisfy all: "
                }
                else if(Number.isInteger(item) && item===0){
                    return "Satisfy one of the requirements: "
                }
                
                else if(Array.isArray(item)){
                    return " ["+fecthArray(item)+"]";
                }      
                else{
                    return " "+item+"/";
                }
                
                
            })

            console.log(new_array);
            return new_array.toString().replaceAll(",", " ");
        }
        else{
            return null;
        } 
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
        
    
        */

        
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
            // no course found
            console.log("error");
            setHeader("Error Occured. No course found.");
            setPopout(true);
 
        }
        else{
            // course found
            console.log(feedback.course);
            setDescription(feedback.course.description);
            setBreadth(feedback.course.breadth);
            setNotes(feedback.course.note);
            setStatus(feedback.course.status);
            setName(feedback.course.name);

            setPre(fetchArray(feedback.course.prerequisites));
            
            setExclusions(fetchArray(feedback.course.exclusions));
            
            setCore(fetchArray(feedback.course.corequisites));
            setRecommended(fetchArray(feedback.course.recommended));
            
            if(feedback.course.score.average<=5 &&feedback.course.score.average>=0){
                setScore(feedback.course.score.average.toFixed(2));
            }
            
            
           
          
        }
    }

    useEffect(()=> {fetchData()}, [])

    return(

        <ThemeProvider theme={mode? dark:light}>
            <CssBaseline/>

        <div> 
        <Navbar toHome={toHome} toProfile={toProfile} sendState={re_render}/>
        <h1 style={{textAlign:"center", margin:"2em"}}>{code}: {name} 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rate: {score}/5
        </h1>
        
        
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
                <p>{exclusions}</p>
                {/*exclusions.filter(item=>(!Number.isInteger(item)))
                .map((item)=>(
                    <p> - {item.toString().replaceAll(",", "/")}</p>
                ))
                */} 
            </AccordionDetails>
        </Accordion>
        
        <Accordion   style={{ marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Course Pre-Requisites</h3>
            </AccordionSummary>
            <AccordionDetails >
                <p>{pre}</p>

                {/* pre.map((item)=>(
                    <p> {item.toString().replaceAll(",", "/")}</p>
                )) */}
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Course Co-Requisites</h3>
            </AccordionSummary>
            <AccordionDetails >
                <p>{core}</p>
                {/*core.filter(item =>(!Number.isInteger(item)))
                .map((item)=>(
                    <p> - {item}</p>
                ))*/}
            </AccordionDetails>
        </Accordion>

        <Accordion   style={{marginBottom:"1em", marginLeft:"8.5em", width: "80%"}}>
            <AccordionSummary expandIcon={<MdExpandMore size={30}/>}>
                <h3>Recommendation</h3>
            </AccordionSummary>
            <AccordionDetails >
                <p>{recommended}</p>
                {/*recommended.map((item)=>(
                    <p> - {item}</p>
                ))*/}
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

        <Button func={toRate} text={`I want to Rate ${code}`} col="steelblue"></Button>
        <Button func ={toViewRate} text="I want to see others' comments" col="steelblue"></Button>
        </div> 
        <Popout trigger = {popout} head = {header} setTrigger={setPopout}/>


        <div> &nbsp;</div>
        <div> &nbsp;</div>
        <div style={{display:"flex"}}>
        <img style={{width: "40%", height: "55%"}} src={bottom1}/>
        <img style={{width: "40%", height: "45%"}} src={bottom2}/>
        </div>

        </div></ThemeProvider>
    )





   
}
export default CourseDescription;