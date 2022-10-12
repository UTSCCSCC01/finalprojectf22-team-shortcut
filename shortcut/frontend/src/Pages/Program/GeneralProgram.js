import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState} from "react";

// Components
import Navbar from "../../Components/Navbar";
import {Card, CardContent, CardMedia, Collapse, Paper, InputBase, IconButton, Divider, MenuList, MenuItem, ListItemText} from '@mui/material';
import { GrSearchAdvanced, GrMore } from "react-icons/gr";
import { ImFilter } from "react-icons/im";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import CardActions from '@mui/material/CardActions';


// images on the card
import Specialist from "../../Images/specialist.jpg";
import Major from "../../Images/major.jpg";
import Minor from "../../Images/minor.jpg";
import Program_Word from "../../Images/Program_Word.jpg";

var programs = require("./ProgramDictionary.json");

const GeneralProgram =()=>{

    let navigate=useNavigate();
    const {state} =useLocation();
    const user=state.user;
    const [search, setSearch]=useState('');

    const [specialist, setSpecialist]=useState(false);
    const [major, setMajor]=useState(false);
    const [minor, setMinor]=useState(false);

    function toProfile(){
        navigate('/profile', {state:{user}});
    }

    function toHome(){
        navigate('/home', {state:{user}});
    }

    async function submitSearch(){

    }

    return(
        <div style={{backgroundColor:"white"}}>
        <Navbar toProfile={toProfile} toHome={toHome}/>
        <h1 style={{fontSize:"3em", textAlign:"center", margin:"1.5em", color:"darkred"}}>
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
            <p >A Minor program gives you the flexibility to diversify 
                your academic portfolio. It will introduce you to a subject
                 area and allow you to augment skills that can be applied to 
                 other fields. </p>
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
   
        <img style={{ maxWidth: "100%", maxHeight:"50%"}} src={Program_Word}/>
        
        </div>
    )
}
export default GeneralProgram;
