import React from "react";
import { useLocation, useNavigate } from "react-router-dom";



const Home =()=>{
    let navigate = useNavigate();

    const {state} =useLocation();
    const{email, password, name, dateOfBirth, gender, Program, Description} =state.feedback; 
    
    const user = {email, password, name, dateOfBirth, gender, Program, Description};
    console.log(Program);
    console.log(Description);
    console.log(user);


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
