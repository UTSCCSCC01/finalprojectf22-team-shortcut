import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../Components/Logo";


const Home =()=>{
    let navigate = useNavigate();

    const {state} =useLocation();
    const{email, password, name, dateofbirth, gender, Program, Description, _id} =state.feedback; 
    
    const user = {email, password, name, dateofbirth, gender, Program, Description, _id};
    console.log(Program);
    console.log(Description);
    console.log(user);


    function handleClick(){
        navigate('/profile', {state:{user}});
    }


    return(
        <div>
            <Logo/>
            <h1>Home Page</h1>
            
            <button onClick = {handleClick}> Personal Profile </button>

        </div>
    )
}
export default Home;