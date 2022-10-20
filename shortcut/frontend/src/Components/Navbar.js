import React from "react";

// icons
import { BsPersonCircle } from "react-icons/bs";

import Logo from "../Components/Logo";
import Button from "../Components/Button";
import {Avatar} from '@mui/material';


const Navbar =({toProfile, toHome})=>{

    

    return(
        <div style={{backgroundColor: "ghostwhite", gap:"45em", display: "flex",flexDirection: "row"}}>
            <Logo/>
            <div style={{gap: "2em", display: "flex",flexDirection: "row"}}>
                <Button func={toHome} text="Home" col="steelblue"/>
            
                <BsPersonCircle onClick={toProfile} size="50"  />
                
            </div>
            
            
        </div>
        

    )
    
}

export default Navbar;