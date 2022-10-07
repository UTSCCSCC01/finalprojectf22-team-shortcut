import React from "react";
import "./Components.css";



function Popout(val){

    return(val.trigger) ? (
        <div className= "failure">
            <div className="message">
                <h2>{val.head}</h2>
                <p>{val.message}</p>
                <button className="close" onClick={()=>val.setTrigger(false)}>X</button>
            </div> 
            {val.children}
            
        </div>
    ) :"";
};

export default Popout;