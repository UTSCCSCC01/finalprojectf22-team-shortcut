import React from "react";
import "./Components.css";



function Popout(val){

    return(val.trigger) ? (
        <div className= "failure">
            <div className="message">
                {console.log(val.message)}
                <h2 style={{color:"black"}}>{val.head}</h2>
                <p style={{color:"black"}}>{val.message}</p>
                <button className="close" onClick={()=>val.setTrigger(false)}>X</button>
            </div> 
            {val.children}
            
        </div>
    ) :"";
};

export default Popout;