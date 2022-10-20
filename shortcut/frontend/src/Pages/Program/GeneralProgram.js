import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState} from "react";

// Components
import Navbar from "../../Components/Navbar";
import { Table, TableHead, TableBody, TableCell, Card, CardContent, CardMedia, Collapse, Paper, InputBase, IconButton, Divider, MenuList, MenuItem, ListItemText} from '@mui/material';
import { GrSearchAdvanced, GrMore } from "react-icons/gr";
import { ImFilter } from "react-icons/im";



// images on the card
import Specialist from "../../Images/specialist.jpg";
import Major from "../../Images/major.jpg";
import Minor from "../../Images/minor.jpg";
import bottom1 from "../../Images/b12.jpg";
import bottom2 from "../../Images/Program_Word.jpg";
import bottom3 from "../../Images/b13.jpg";

import { useEffect } from "react";
var programs = require("./ProgramDictionary.json");

const GeneralProgram =()=>{

    let navigate=useNavigate();
    const {state} =useLocation();
    const user=state.user;
    const [search, setSearch]=useState('');
    // indicate search status
    const [search_result, setSearchResult] = useState(0);

    // info card
    const [specialist, setSpecialist]=useState(false);
    const [major, setMajor]=useState(false);
    const [minor, setMinor]=useState(false);

    // store return data from backend
    const [programList, setProgramList] = useState([]);
 


    function toProfile(){
        navigate('/profile', {state:{user}});
    }

    function toHome(){
        navigate('/home', {state:{user}});
    }

    function toDescription(name){
        navigate(`/program/${name}`, {state:{user}});
    }

    useEffect(()=> {setSearchResult(0)}, [search]);

    async function submitSearch(){
        const keywords=search;
        const data = {keywords};
        let feedback = await fetch('http://localhost:8080/searchprogramskey', {
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        feedback = await feedback.json();
        if(feedback.length===0){
            // no course found
            setSearchResult(-1);
 
            
        }
        else{
            setSearchResult(1);
            setProgramList(feedback.result);

            // setNameList(feedback.programname);
            // setTypeList(feedback.type);
            
            // course found

        }
    }

    return(
        <div style={{backgroundColor:"white"}}>
        <Navbar toProfile={toProfile} toHome={toHome}/>
        <h1 style={{fontSize:"3em", textAlign:"center", margin:"1.5em", color:"saddlebrown"}}>
            Find Your Program</h1>
        <Paper style={{flexDirection:"row", display:"flex", backgroundColor:"lavender", height:"25em"}}>
        
        <Card sx={{maxWidth: 250}}> 
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

        <Card sx={{maxWidth: 250}}> 
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

        <Card sx={{maxWidth: 250}}> 
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
        <Paper component="form"  style={{backgroundColor:"white", width:"60%", height: "50%"}}>
            
            <InputBase style={{width: "80%", height: "8em"}} placeholder="Search..." value={search} onChange={(e)=> setSearch(e.target.value)}> </InputBase>
            
            <IconButton type="button" onClick={submitSearch} sx={{p:"15px"}}>
            <GrSearchAdvanced/>
            </IconButton>
            
            <IconButton type="button" sx={{ p:"15px"}}><ImFilter color="black"/></IconButton>
            <MenuList dense style={{maxHeight:"10em", overflow: "scroll"}}>
                {programs.filter(program=>{
                    const input=search.toLowerCase();
                    const output=program.keyword.toLowerCase();
                    return input && output.startsWith(input) &&input!==output;
                }) 
                .map((program)=>(
                    <div><Divider/>
                        <MenuItem>
                        <ListItemText onClick={()=>setSearch(program.keyword)}
                        sx={{mx:"21em"}}>{program.keyword}</ListItemText>  
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

        {search_result<0 &&
            <div>
                <h3 style={{color: "red", textAlign:"center", marginTop:"2em"}}> Sorry, keyword doesn't match any program</h3>
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
export default GeneralProgram;
