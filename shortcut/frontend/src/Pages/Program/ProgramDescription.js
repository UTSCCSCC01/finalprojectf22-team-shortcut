import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";

import { Table, TableHead, TableBody, TableCell, Card, CardContent, CardMedia, Collapse, Paper, InputBase, IconButton, Divider, MenuList, MenuItem, ListItemText} from '@mui/material';


const ProgramDescription =()=>{

    const{name}=useParams();
    


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
            console.log("")
            
        }
        else{
            // program found
            console.log(feedback);
           
          
        }
    }

    // useEffect to send post request
    useEffect(()=> {fetchData()}, [])



    return(
        <div>
        <Navbar/>
        <h1>{name}</h1>
        <Paper>
        <Card>

        </Card>
        </Paper>
        
        
        
        
        
        </div>
    )

}

export default ProgramDescription;