import './GradReq.css';
import Popout from '../../Components/Popout';

import Button from '../../Components/Button';
import * as React from 'react';
import { Link, Routes, Route, BrowserRouter as Router, useNavigate, useLocation, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import { requirePropFactory } from '@mui/material';
import Navbar from '../../Components/Navbar';

const GradReq =()=> {
    let navigate = useNavigate();

    // popout for error msg 
    const [msg, setMsg] = useState('');
    const [header, setHeader] = useState('');
    const [popout, setPopout] = useState(false);
    const {state} = useLocation();
    const user = state.user;
    const email = user.email.data;

    const back =()=>{
   
        navigate(-1, {state: {user}});
    }

    const home =()=>{

        navigate('/home', {state: {user}});
    }    
    function toProfile(){
        navigate('/profile', {state:{user}});
    }

    return(
        <div style={{backgroundColor:"white"}}>
            <Navbar toHome={home} toProfile={toProfile}/>
            <div className="boxGR">
                &nbsp;
                <h1 style={{"font-size":"32px","margin-left":"0.5em","margin-bottom":"0.5em"}}>Graduation Requirements</h1>
                &nbsp;
                <p className='pGR'>Honours Bachelor of Arts (HBA) and Honours Bachelor of Science (HBSc):</p>
                <p className='pGR'>To qualify for the degree, students must:</p>
                <p className='pGR'>1. Pass a minimum of 20.0 credits:</p>
                &nbsp;
                <p className='pHalfIndentedGR'>- Of the 20.0 credits, at least 6.0 credits must be at the C- and/or D-level, with at least 1.0 credit at the D-level:</p>
                <p className='pHalfIndentedGR'>- Of the 20.0 credits, at least 0.5 credit must come from each of the following five breadth categories (breadth categories are identified in course descriptions):</p>
                &nbsp;
                <p className='pIndentedGR'>  Arts, Literature & Language</p>
                <p className='pIndentedGR'>  History, Philosophy & Cultural Studies</p>
                <p className='pIndentedGR'>  Social & Behavioural Sciences</p>
                <p className='pIndentedGR'>  Natural Sciences</p>
                <p className='pIndentedGR'>  Quantitative Reasoning</p>
                &nbsp;
                <p className='pGR'>2. Complete a program or programs as below (only programs offered by UTSC may be used to fulfill degree requirements, and students are permitted to graduate with a maximum of three certified programs):</p>
                &nbsp;
                <p className='pHalfIndentedGR'>- At least one Specialist program; or</p>
                <p className='pHalfIndentedGR'>- At least two Major programs; or</p>
                <p className='pHalfIndentedGR'>- At least one Major program and two Minor offerings.</p>
                &nbsp;
                <p className='pGR'>3. Ensure the combinations of programs used to meet the degree requirement include a minimum of 12.0 different credits.*</p>
                &nbsp;
                <p className='pGR'>4. Earn a cumulative grade point average of at least 1.85**. A student whose cumulative grade point average (CGPA) is at least 1.60, but less than 1.85, may request to graduate with a BA or BSc.</p>
                &nbsp;
                <p className='pGR'>Notes:</p>
                <p className='pGR'>*Some combinations of programs are not possible due to the similarity in course requirements. Students with questions or concerns are advised to consult the Academic Advising & Career Centre to ensure they complete a minimum of 12.0 different credits. In the event that a student completes two certified Major programs and an additional certified Minor, the 12.0 distinct credits may be taken from any of these certified programs.</p>
                <p className='pGR'>**The CGPA requirement to complete certain programs is higher than 1.85. For details see the individual program descriptions.</p>
                &nbsp;
                <p className='pGR'>The type of degree students receive, whether HBA or HBSc, will be determined by the Specialist or Major program completed. For example:</p>
                &nbsp;
                <p className='pHalfIndentedGR'>- Students completing a Specialist BA program will receive an HBA degree;</p>
                <p className='pHalfIndentedGR'>- Students completing a Specialist BSc program will receive an HBSc degree;</p>
                <p className='pHalfIndentedGR'>- Students completing a Major BA program, in conjunction with any combination of two Minor programs, will receive an HBA degree;</p>
                <p className='pHalfIndentedGR'>- Students completing a Major BSc program, in conjunction with any combination of two Minor programs, will receive an HBSc degree;</p>
                <p className='pHalfIndentedGR'>- Students completing a Major BA program and a Major BSc program may choose either the HBA or HBSc degree.</p>
                &nbsp;
                <p className='pGR'>Bachelor of Business Administration (BBA):</p>
                <p className='pGR'>To qualify for the degree, students must:</p>
                <p className='pGR'>1. Pass a minimum of 20.0 credits.</p>
                &nbsp;
                <p className='pHalfIndentedGR'>- Of the 20.0 credits, at least 6.0 credits must be at the C- and/or D-level, with at least 1.0 credit at the D-level.</p>
                <p className='pHalfIndentedGR'>- Of the 20.0 credits, at least 0.5 credit must come from each of the following five breadth categories (breadth categories are identified in course descriptions):</p>
                &nbsp;
                <p className='pIndentedGR'>  Arts, Literature & Language</p>
                <p className='pIndentedGR'>  History, Philosophy & Cultural Studies</p>
                <p className='pIndentedGR'>  Social & Behavioural Sciences</p>
                <p className='pIndentedGR'>  Natural Sciences</p>
                <p className='pIndentedGR'>  Quantitative Reasoning</p>
                &nbsp;
                <p className='pHalfIndentedGR'>- Of the 20.0 credits, at least 0.5 credit must come from courses designated as work-integrated-learning (work-integrated-learning, or WIL, courses are identified in course descriptions).</p>
                &nbsp;
                <p className='pGR'>2. Programs: complete one of the Specialist programs in Management, or the Specialist in Economics for Management Studies (only programs offered by UTSC may be used to fulfill degree requirements).</p>
                &nbsp;
                <p className='pGR'>3. Earn a cumulative grade point average of at least 2.0*.</p>
                &nbsp;
                <p className='pGR'>*Note: the CGPA requirement to complete certain programs is higher than 2.0. For details see the individual program descriptions.</p>
                &nbsp;
                <p className='pGR'>Year of Study:</p>
                <p className='pGR'>The following is used to define the year of study of degree students:</p>
                &nbsp;
                <p className='pHalfIndentedGR'>1st year - has fewer than 4.0 credits</p>
                <p className='pHalfIndentedGR'>2nd year - has 4.0 to 8.5 credits</p>
                <p className='pHalfIndentedGR'>3rd year - has 9.0 to 13.5 credits</p>
                <p className='pHalfIndentedGR'>4th year - has 14.0 or more credits</p>
                &nbsp;
                <div className="buttonsGR">
                    <Button text = "Back" col="steelblue" func={back}></Button>                  
                </div>
            </div>

            <Popout trigger ={popout} head = {header} message={msg} setTrigger={setPopout}/>
        </div>
    )
}

export default GradReq;
