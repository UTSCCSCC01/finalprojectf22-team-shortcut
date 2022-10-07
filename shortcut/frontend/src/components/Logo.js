import React from "react";

import {BiSearchAlt} from "react-icons/bi";
import {ImCheckmark} from "react-icons/im";
import {GrLike} from "react-icons/gr";
import {BsQuestionLg} from "react-icons/bs";

const Logo =({top})=>{
    return(
        <div className="logo">
            &nbsp;
            <h1 style={{color:"steelblue", marginTop: top}  }
            ><BiSearchAlt color="black"/> shortcUTSC <GrLike color="blue"/></h1>
            
        </div>
        
    )
}


export default Logo;