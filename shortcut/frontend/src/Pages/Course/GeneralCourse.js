import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import "./GeneralCourse.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Select, InputLabel, Checkbox,Slider, Box, Radio, RadioGroup, FormControlLabel,FormControl,FormLabel,Table, TableHead, TableBody, TableCell, Card, CardContent, CardMedia, Collapse, Paper, InputBase, IconButton, Divider, MenuList, MenuItem, ListItemText} from '@mui/material';

// icons
import { ImFilter } from "react-icons/im";
import { GrSearchAdvanced, GrMore } from "react-icons/gr";

// images
import A from "../../Images/b15.jpg";
import B from "../../Images/b14.jpg";
import C from "../../Images/b18.jpg";
import D from "../../Images/b16.jpg";
import bottom1 from "../../Images/b12.jpg";
import bottom2 from "../../Images/quote3.jpg";
import bottom3 from "../../Images/b13.jpg";

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

    // indicate advanced search
    const [advanced, setAdvanced]=useState(false);

    // advance search body
    const [breadth, setBreadth]=useState("");
    const [average, setAverage]=useState(0);
    const [level, setLevel]=useState("");
    const [pre, setPre]=useState("");
    //const [description, setDescription]=useState('');
    const [search_description, setSearchDescription]=useState(false);


    
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
    const advanced_button=()=>{
        setAdvanced(!advanced);
        setPre("");
        setLevel("");
        setBreadth("");

        setAverage(0);
        setSearchResult(0);
        setSearchDescription(false);
    }


    async function submitSearch(){
        // submit keyword to backend
        
        if(!advanced){
            const keywords=search;
            const breadth = "";
            const data = {keywords, breadth};
            console.log(data);
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
        else{
            console.log(search_description);
            var keywords=search;
            var description="";
            if(search_description){
                
                keywords="";
                description=search;
            }
            
            
            const score = {average};
            const res={score, breadth, description, keywords, pre, level};
            const data={res};
            console.log(data);
            let feedback = await fetch('http://localhost:8080/advanceSearch', {
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
                console.log(feedback);
                // bug in here, no result still shows check = 1
                console.log(feedback.a);
                setSearchResult(1);
                setCourseList(feedback.a);
                
            }
        }
        


    }
    

    return (
        
        <div style={{backgroundColor: "white"}}>
        <Navbar toProfile={toProfile} toHome={toHome}/>
        <h1 style={{fontSize:"3em", textAlign:"center", margin:"1.5em", color:"saddlebrown"}}>
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
            
            <IconButton type="button" sx={{ p:"15px"}} onClick={advanced_button}><ImFilter color="black"/></IconButton>
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

        {search_result<0 && !advanced &&
            <div>
                <h3 style={{color: "red", textAlign:"center", marginTop:"2em"}}> Sorry, keyword doesn't match any courses</h3>
            </div>
        }

        {search_result<0 && advanced &&
            <div>
                <h3 style={{color: "red", textAlign:"center", marginTop:"2em"}}> Sorry, no matching courses</h3>
            </div>
        }

        {advanced &&
            <div ><div>&nbsp;</div>

            <div style={{maxWidth: "60%", display:"flex"}}>
            
            <Box>
            <FormControl>
                <FormLabel> Breadth </FormLabel>
                <RadioGroup onChange={(e)=>setBreadth(e.target.value)}>
                    <FormControlLabel value="Arts"control={<Radio/>} label="Arts, Literature, and Language"/>
                    <FormControlLabel value="Natural"control={<Radio/>} label="Natural Sciences"/>
                    <FormControlLabel value="History"control={<Radio/>} label="History, Philosophy, and Cultural Studies"/>
                    <FormControlLabel value="Quantitative"control={<Radio/>} label="Quantitative Reasoning"/>
                    <FormControlLabel value="Social"control={<Radio/>} label="Social and Behavioural Sciences"/>
                   
                </RadioGroup>
            </FormControl></Box>

            <Box>
            <FormControl>
                <FormLabel> Level </FormLabel>
                <RadioGroup onChange={(e)=>setLevel(e.target.value)}>
                    <FormControlLabel value="A"control={<Radio/>} label="A-Level"/>
                    <FormControlLabel value="B"control={<Radio/>} label="B-Level"/>
                    <FormControlLabel value="C"control={<Radio/>} label="C-Level"/>
                    <FormControlLabel value="D"control={<Radio/>} label="D-Level"/>
                </RadioGroup>
            </FormControl></Box>
            </div><div> &nbsp;</div> <div> &nbsp;</div>
            <div style={{maxWidth: "60%", display:"flex"}}>
            <Box>
                <FormControl>
                    <FormLabel> Pre-Requisites </FormLabel>
                    <RadioGroup onChange={(e)=>setPre(e.target.value)}>
                        <FormControlLabel value="need"control={<Radio/>} label="With Pre-requisites"/>
                        <FormControlLabel value="no"control={<Radio/>} label="Without Pre-requisites"/>
                        
                    </RadioGroup>
                </FormControl></Box>
            

            <Box sx={{width:200}}>
            <FormLabel>Average Rate Higher Than:</FormLabel>
            <div> &nbsp;</div>
            <Slider value={average} defaultValue={0}
                onChange={(e)=>setAverage(e.target.value)} 
                min={0} max={5} valueLabelDisplay="auto"/>
            </Box>
            </div>
            <div> &nbsp;</div> <div> &nbsp;</div>

            <div style={{textAlign:"center"}}>
                Do you want to search your keyword in course description?
                <Checkbox checked={search_description} onChange={()=>{setSearchDescription(!search_description)}}/>
                <div> &nbsp;</div>
                
            </div>
            
            <div>&nbsp;</div> 
            <div style={{textAlign:"center", color:"blue"}}>
                <div>Note: Not necessary to select every field in detail.</div>
                Leave blank means accept every options
                </div>
            </div>
            
        }

        <div> &nbsp;</div> <div> &nbsp;</div> <div> &nbsp;</div>
        <div style={{display:"flex"}}>
        <img style={{width: "20%", height:"15%"}} src={bottom1}/>
        <img style={{ width: "40%", height:"15%"}} src={bottom2}/>
        <img style={{width: "20%", height:"15%"}} src={bottom3}/>
        </div></div>
    )
}

export default GeneralCourse;
