import React from "react";
import { useState, useEffect } from "react";

// icons
import { BsPersonCircle } from "react-icons/bs";

import Logo from "../Components/Logo";
import Button from "../Components/Button";
import {Avatar, Box, Switch, Paper, FormControlLabel} from '@mui/material';

import {light, dark} from "./Themes";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";



const Navbar =({toProfile, toHome, sendState})=>{

    
    const [mode, setMode]=useState(JSON.parse(localStorage.getItem('mode'))|| false);
    const changeMode=()=>{
       
        setMode(!mode);
        sendState();

    }
    useEffect(()=>{
        localStorage.setItem('mode', JSON.stringify(mode), [mode])
    })
    

    return(
        <ThemeProvider theme={mode ? dark:light}>
            <CssBaseline/>
        <Box sx={{bgcolor:"background.paper.third"}} style={{ gap:"45em", display: "flex",flexDirection: "row"}}>
            <Logo/>
            <div style={{gap: "2em", display: "flex",flexDirection: "row"}}>
                <FormControlLabel label="Dark Mode" control ={<Switch onChange={changeMode} checked={mode} />}/>
                

                <Button func={toHome} text="Home" col="steelblue"/>
            
                <BsPersonCircle onClick={toProfile} size="50"  />
                
            </div>
            
            
        </Box></ThemeProvider>
        

    )
    
}

export default Navbar;