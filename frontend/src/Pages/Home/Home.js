import React from "react";
import { useLocation, useNavigate } from "react-router-dom";



const Home =()=>{
    let navigate = useNavigate();

    const {state} =useLocation();
    const{email, password, name, dateOfBirth, gender, program, description} =state.feedback; 
    
    const user = {email, password, name, dateOfBirth, gender, program, description};
    


    function handleClick(){
        navigate('/profile', {state:{user}});
    }


    return(
        <div>
            <h1>Home Page</h1>
            
            
            
            <button onClick = {handleClick}> Personal Profile </button>

        </div>
    )
}
export default Home;
