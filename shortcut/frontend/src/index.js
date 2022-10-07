import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { Link, Routes, Route, BrowserRouter as Router, useNavigate} from "react-router-dom";
import routes from './routes';



// pages
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Logo from "./Components/Logo";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/PersonalProfile";



const root =ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  routes()
  
 
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
