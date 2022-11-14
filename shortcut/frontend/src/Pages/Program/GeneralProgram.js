import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState} from "react";

// Components
import Navbar from "../../Components/Navbar";
import {Select, InputLabel, Box, Radio, RadioGroup, FormControlLabel,FormControl,FormLabel, Table, TableHead, TableBody, TableCell, Card, CardContent, CardMedia, Collapse, Paper, InputBase, IconButton, Divider, MenuList, MenuItem, ListItemText} from '@mui/material';
import { GrSearchAdvanced, GrMore } from "react-icons/gr";
import { ImFilter } from "react-icons/im";



// images on the card
import Specialist from "../../Images/specialist.jpg";
import Major from "../../Images/major.jpg";
import Minor from "../../Images/minor.jpg";
import bottom1 from "../../Images/b12_transparent.png";
import bottom2 from "../../Images/Program_Word.jpg";
import bottom3 from "../../Images/b13_transparent.png";

import { useEffect } from "react";

import {light, dark} from "../../Components/Themes";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";



var programs = require("./ProgramDictionary.json");

const GeneralProgram =()=>{

    const [mode, setMode]=useState(JSON.parse(localStorage.getItem('mode')));
    const [refresh, setRefresh] = useState(false);

    

    let navigate=useNavigate();
    const {state} =useLocation();
    const user=state.user;
    const [search, setSearch]=useState('');
    // indicate search status
    const [search_result, setSearchResult] = useState(0);
    
    // indicate advance searching or not
    const [advanced, setAdvanced]=useState(false)

    // info card
    const [specialist, setSpecialist]=useState(false);
    const [major, setMajor]=useState(false);
    const [minor, setMinor]=useState(false);

    // store return data from backend
    const [programList, setProgramList] = useState([]);

    const [area, setArea]=useState("");
    const [degree, setDegree]=useState("");
    const [enrolment, setEnrolment]=useState("");
    const [coop, setCoop]=useState("");
    const [type, setType]=useState("");

    function re_render(){
        setRefresh(!refresh);
    }


    function toProfile(){
        navigate('/profile', {state:{user}});
    }

    function toHome(){
        navigate('/home', {state:{user}});
    }

    function toDescription(name){
        navigate(`/program/${name}`, {state:{user}});
    }


    const advanced_button=()=>{
        setAdvanced(!advanced);
        setArea("");
        setDegree("");
        setEnrolment("");
        setCoop("");
        setType("");
        setSearchResult(0);
    }
    
    useEffect(()=> {setSearchResult(0)}, [search]);
    
    useEffect(()=> setMode(JSON.parse(localStorage.getItem('mode'))), [refresh]);


    async function submitSearch(){
        const keywords=search;
        if(!advanced){
            
            const data = {keywords};
            let feedback = await fetch('http://localhost:8080/searchprogramskey', {
                method:'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            feedback = await feedback.json();
            if(feedback.length===0){
                // no program found
                setSearchResult(-1);
    
                
            }
            else{
                setSearchResult(1);
                setProgramList(feedback.result);

            }

        }
        else{
            const data={coop, enrolment, area, type, degree, keywords};
            console.log(data)
            let feedback = await fetch('http://localhost:8080/advanceprograms', {
                method:'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            feedback=await feedback.json();
            if(feedback.length===0){
                // no program found
                setSearchResult(-1);
                console.log(feedback);
            }
            else{
                console.log(feedback.finalresult);
                
                setSearchResult(1);
                setProgramList(feedback.finalresult);
            }
        }
        
    }



    return(
      
        <ThemeProvider theme={mode? dark:light}>
            <CssBaseline/>
        <div >
        
        <Navbar toProfile={toProfile} toHome={toHome} sendState={re_render}/>
        <h1  style={{color:"text.secondary", fontSize:"3em", textAlign:"center", margin:"1.5em"}}>
            Find Your Program</h1>
        
      
        <Paper sx={{bgcolor:"background.paper.secondary"}} style={{flexDirection:"row", display:"flex", height:"25em"}}>
        
        <Card sx={{maxWidth: 250, bgcolor:"background.default"}}> 
        <CardMedia component="img" image={Specialist}></CardMedia>
        <CardContent>
            <h3>Specialist</h3>
            <IconButton onClick={()=>{setSpecialist(!specialist)}}>
                <GrMore/>
            </IconButton>
            </CardContent>
            <Collapse in={specialist} unmountOnExit >
            <CardContent >
            <p >A Specialist program provides you with an in-depth, 
                focused, and sophisticated understanding of a subject. Provides 
                between 12-16 of your total 20 credits needed to graduate.</p>
            </CardContent>
            </Collapse>
        </Card>

        <Card sx={{maxWidth: 250 , bgcolor:"background.default"}}> 
        <CardMedia component="img" image={Major}></CardMedia>
        <CardContent>
            <h3>Major</h3>
            <IconButton onClick={()=>{setMajor(!major)}}>
                <GrMore/>
            </IconButton>
            </CardContent>
            <Collapse in={major} unmountOnExit >
            <CardContent >
            <p >A Major program is designed to provide you with a 
                concentrated understanding of an academic field. This 
                provides you the opportunity to combine multiple programs 
                across the arts, sciences, or economics.</p>
            </CardContent>
            </Collapse>
        </Card>

        <Card sx={{maxWidth: 250, bgcolor:"background.default"}}> 
        <CardMedia component="img" image={Minor}></CardMedia>
        <CardContent>
            <h3>Minor</h3>
            <IconButton onClick={()=>{setMinor(!minor)}}>
                <GrMore/>
            </IconButton>
            </CardContent>
            <Collapse in={minor} >
            <CardContent >
            <p> A Minor program gives you the flexibility to diversify 
                your academic portfolio. It will introduce you to a subject
                 area and allow you to augment skills that can be applied to 
                 other fields.</p>
            </CardContent>
            </Collapse>
        </Card>


        

        </Paper> <h1 style={{textAlign:"center", margin:"1.3em"}}>Program Search </h1>
        <Paper component="form" sx={{bgcolor:"background.paper.primary"}} style={{ width:"60%", height: "50%"}}>
            
            <InputBase style={{width: "80%", height: "8em"}} placeholder="Search..." value={search} onChange={(e)=> setSearch(e.target.value)}> </InputBase>
            
            <IconButton type="button" onClick={submitSearch} sx={{p:"15px"}}>
            <GrSearchAdvanced/>
            </IconButton>
            
            <IconButton type="button" sx={{ p:"15px"}} onClick={advanced_button}><ImFilter color="black"/></IconButton>
            <MenuList dense style={{maxHeight:"10em", overflow: "scroll"}}>
                {programs.filter(program=>{
                    const input=search.toLowerCase();
                    const output=program.keyword.toLowerCase();
                    return input && output.startsWith(input) &&input!==output;
                }) 
                .map((program)=>(
                    <div><Divider/>
                        <MenuItem>
                        <ListItemText  onClick={()=>setSearch(program.keyword)}
                        sx={{mx:"21em", color:"#6495ed"}}>{program.keyword}</ListItemText>  
                        </MenuItem>                    
                    </div>    
                ))}
            </MenuList>
        </Paper>
        
      


        
        {search_result>0 && 
        <Table sx={{maxWidth: "60%"}} >
            <TableHead >
                <TableCell><h3>Program Name</h3></TableCell>
                <TableCell><h3>Type</h3></TableCell>
            </TableHead>
            
                {programList.map((item)=>(
                <TableBody>    
                    <TableCell> <a style={{color:"blue", textDecorationLine:"underline"}} onClick={()=>toDescription(item.name)}>{item.name}</a></TableCell>
                    <TableCell>{item.type}</TableCell>
                </TableBody>
                ))}
        </Table>
        }

        {search_result<0 && !advanced &&
            <div>
                <h3 style={{color: "red", textAlign:"center", marginTop:"2em"}}> Sorry, keyword doesn't match any program</h3>
            </div>
        }

        {search_result<0 && advanced &&
            <div>
                <h3 style={{color: "red", textAlign:"center", marginTop:"2em"}}> Sorry, no matching program</h3>
            </div>
        }

        {advanced &&
        <div ><div>&nbsp;</div>
        
        <div style={{maxWidth: "60%", display:"flex"}}>
            
            <Box>
            <FormControl>
                <FormLabel> Co-op </FormLabel>
                <RadioGroup onChange={(e)=>setCoop(e.target.value)}>
                    <FormControlLabel value="\w"control={<Radio/>} label="Yes"/>
                    <FormControlLabel value="nocoop"control={<Radio/>} label="No"/>

                </RadioGroup>
            </FormControl></Box>

            <Box>
            <FormControl>
            <FormLabel> Type</FormLabel>
            <RadioGroup onChange={(e)=>setType(e.target.value)}>
                <FormControlLabel value="specialist" control={<Radio/>} label="Specialist"/>
                <FormControlLabel value="major" control={<Radio/>} label="Major"/>
                <FormControlLabel value="minor" control={<Radio/>} label="Minor"/>
            </RadioGroup>
            </FormControl></Box>

            <Box>
            <FormControl>
            <FormLabel > Enrolment </FormLabel>
            <RadioGroup onChange={(e)=>setEnrolment(e.target.value)}>
                <FormControlLabel value="\w"control={<Radio/>} label="Limited"/>
                <FormControlLabel value="unlimited" control={<Radio/>} label="Unlimited"/>
            </RadioGroup>
            </FormControl></Box>
            </div> 
            <div>&nbsp;</div>
            <div style={{maxWidth: "60%", display:"flex"}}>
            <Box >
                <FormControl variant="filled" fullWidth >
                    <InputLabel >Area</InputLabel>
                    <Select value={area} onChange={(e)=>setArea(e.target.value)} sx={{ minWidth:200}} >
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value="Computer Science">Computer Science</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value= "Statistics">Statistics</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value="African Studies">African Studies</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value= "paramedicine">Paramedicine</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value= "Combined Degree">Combined Degree</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value= "history">History</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value= "International Development Studies">International Development Studies</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value= "City Studies">City Studies</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value= "neuroscience">Neuroscience</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value= "management">Management</MenuItem>


                    </Select>
                </FormControl>
            </Box>

            <Box >
                <FormControl variant="filled" fullWidth>
                    <InputLabel>Degree</InputLabel>
                    <Select sx={{minWidth:260}} value={degree} label="Degree" onChange={(e)=>setDegree(e.target.value)} >
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value={"BA"}> Honours Bachelor of Arts</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value={"BSc"}> Honours Bachelor of Science</MenuItem>
                        <MenuItem sx={{bgcolor:"background.paper.primary"}} value={"BBA"}> Bachelor of Business Administration</MenuItem>
                    </Select>
                </FormControl>
            </Box></div>
            <div>&nbsp;</div> <div>&nbsp;</div>
            <div style={{textAlign:"center", color:"blue"}}>
                <div>Note: Not necessary to select every field in detail.</div>
                Leave blank means accept every options
                </div>
            </div>


        
        }

        <div> &nbsp;</div> <div> &nbsp;</div> <div> &nbsp;</div>
        <div style={{display:"flex"}}>
        <img style={{width: "20%", height:"15%"}} src={bottom1} />
        <img style={{ width: "40%", height:"15%"}} src={bottom2}/>
        <img style={{width: "20%", height:"15%"}}  src={bottom3}/>
        </div>
    
        </div></ThemeProvider>



    )
}
export default GeneralProgram;
