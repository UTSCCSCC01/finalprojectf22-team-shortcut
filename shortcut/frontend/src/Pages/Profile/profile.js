import './PersonalProfile.css';
import Button from '../../Components/Button';
import React, {Component} from 'react';
import { Link, Routes, Route, BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import App from "../../App"; 
import '../../Components/Button.css';
import { useState } from "react";




const PersonalProfile =()=> {
    const {state} = useLocation();
    
    const {email, password, name, dateOfBirth, gender, program, description} = state.user;


    

    state = {
        userid: "default userid",
        name: "default name",
        password: "default password",
        isNameInEditMode: false,
        gender: "default gender",
        isGenderInEditMode: false,
        age: "default age",
        isAgeInEditMode: false,
        dateOfBirth: "default date of birth",
        isDateOfBirthInEditMode: false,
        programOfStudy: "default program of study",
        isProgramOfStudyInEditMode: false,
        schoolEmail: "default school email",
        isSchoolEmailInEditMode: false,
        fieldsOfInterests: "default fields of interests",
        isFieldsOfInterestsInEditMode: false,
    }

    async function sendJson() {
        var jsonData = {
            "_id": {"$oid": this.state.userid},
            "email": {"data": this.state.schoolEmail, "display": true}, 
            "password": "this.state.password",
            "name": {"data": this.state.name, "display": true},
            "dateofbirth": {"data": this.state.dateOfBirth, "display": true},
            "gender": {"data": this.state.gender, "display": true},
            "Program": {"data": this.state.programOfStudy, "display": true},
            "Description": {"data": this.state.fieldsOfInterests, "display": true}
        }

        let feedback = await fetch('http://localhost:8080/PersonalProfile', {
            method: 'POST', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(jsonData)
        })
        feedback = await feedback.json();

    }

    const switchNameEditMode = () => {
        this.setState({
            isNameInEditMode: !this.state.isNameInEditMode
        })
    }

    const renderNameEditView = () => {
        return <div>
            <input
                type="text" 
                defaultValue={this.state.name} 
                ref="theNameInput"
                class="txtInput profileContent"
            />
            
            <button onClick={this.switchNameEditMode} class="cancelButton">X</button>
            <button onClick={this.updateName} class="saveButton">Save</button>
        </div>
    }

    const updateName = () => {
        this.setState({
            isNameInEditMode: false,
            name: this.refs.theNameInput.value
        })
        this.sendJson();
    }

    const renderNameDefaultView = () => {
        return <div onDoubleClick={this.switchNameEditMode} class="txtInput profileContent">
        {this.state.name}
    </div>
    }

    const switchGenderEditMode = () => {
        this.setState({
            isGenderInEditMode: !this.state.isGenderInEditMode
        })
    }

    const renderGenderEditView = () => {
        return <div>
            <input
                type="text" 
                defaultValue={this.state.gender} 
                ref="theGenderInput"
                class="txtInput profileContent"
            />
            <button onClick={this.switchGenderEditMode} class="cancelButton">X</button>
            <button onClick={this.updateGender} class="saveButton">Save</button>
        </div>
    }

    const updateGender = () => {
        this.setState({
            isGenderInEditMode: false,
            gender: this.refs.theGenderInput.value
        })
    }

    const renderGenderDefaultView = () => {
        return <div onDoubleClick={this.switchGenderEditMode} class="txtInput profileContent">
        {this.state.gender}
    </div>
    }

    const switchAgeEditMode = () => {
        this.setState({
            isAgeInEditMode: !this.state.isAgeInEditMode
        })
    }

    const renderAgeEditView = () => {
        return <div>
            <input
                type="text" 
                defaultValue={this.state.age} 
                ref="theAgeInput"
                class="txtInput profileContent"
            />
            <button onClick={this.switchAgeEditMode} class="cancelButton">X</button>
            <button onClick={this.updateAge} class="saveButton">Save</button>
        </div>
    }

    const updateAge = () => {
        this.setState({
            isAgeInEditMode: false,
            age: this.refs.theAgeInput.value
        })
    }

    const renderAgeDefaultView = () => {
        return <div onDoubleClick={this.switchAgeEditMode} class="txtInput profileContent">
        {this.state.age}
    </div>
    }

    const switchDateOfBirthEditMode = () => {
        this.setState({
            isDateOfBirthInEditMode: !this.state.isDateOfBirthInEditMode
        })
    }

    const renderDateOfBirthEditView = () => {
        return <div>
            <input
                type="text" 
                defaultValue={this.state.dateOfBirth} 
                ref="theDateOfBirthInput"
                class="txtInput profileContent"
            />
            <button onClick={this.switchDateOfBirthEditMode} class="cancelButton">X</button>
            <button onClick={this.updateDateOfBirth} class="saveButton">Save</button>
        </div>
    }

    const updateDateOfBirth = () => {
        this.setState({
            isDateOfBirthInEditMode: false,
            dateOfBirth: this.refs.theDateOfBirthInput.value
        })
    }

    const renderDateOfBirthDefaultView = () => {
        return <div onDoubleClick={this.switchDateOfBirthEditMode} class="txtInput profileContent">
        {this.state.dateOfBirth}
    </div>
    }

    const switchProgramOfStudyEditMode = () => {
        this.setState({
            isProgramOfStudyInEditMode: !this.state.isProgramOfStudyInEditMode
        })
    }

    const renderProgramOfStudyEditView = () => {
        return <div>
            <input
                type="text" 
                defaultValue={this.state.programOfStudy} 
                ref="theProgramOfStudyInput"
                class="txtInput profileContent"
            />
            <button onClick={this.switchProgramOfStudyEditMode} class="cancelButton">X</button>
            <button onClick={this.updateProgramOfStudy} class="saveButton">Save</button>
        </div>
    }

    const updateProgramOfStudy = () => {
        this.setState({
            isProgramOfStudyInEditMode: false,
            programOfStudy: this.refs.theProgramOfStudyInput.value
        })
    }

    const renderProgramOfStudyDefaultView = () => {
        return <div onDoubleClick={this.switchProgramOfStudyEditMode} class="txtInput profileContent">
        {this.state.programOfStudy}
    </div>
    }

    const switchSchoolEmailEditMode = () => {
        this.setState({
            isSchoolEmailInEditMode: !this.state.isSchoolEmailInEditMode
        })
    }

    const renderSchoolEmailEditView = () => {
        return <div>
            <input
                type="text" 
                defaultValue={this.state.schoolEmail} 
                ref="theSchoolEmailInput"
                class="txtInput profileContent"
            />
            <button onClick={this.switchSchoolEmailEditMode} class="cancelButton">X</button>
            <button onClick={this.updateSchoolEmail} class="saveButton">Save</button>
        </div>
    }

    const updateSchoolEmail = () => {
        this.setState({
            isSchoolEmailInEditMode: false,
            schoolEmail: this.refs.theSchoolEmailInput.value
        })
    }

    const renderSchoolEmailDefaultView = () => {
        return <div onDoubleClick={this.switchSchoolEmailEditMode} class="txtInput profileContent">
        {this.state.schoolEmail}
    </div>
    }

    const switchFieldsOfInterestsEditMode = () => {
        this.setState({
            isFieldsOfInterestsInEditMode: !this.state.isFieldsOfInterestsInEditMode
        })
    }

    const renderFieldsOfInterestsEditView = () => {
        return <div>
            <input
                type="text" 
                defaultValue={this.state.fieldsOfInterests} 
                ref="theFieldsOfInterestsInput"
                class="txtInput profileContent"
            />
            <button onClick={this.switchFieldsOfInterestsEditMode} class="cancelButton">X</button>
            <button onClick={this.updateFieldsOfInterests} class="saveButton">Save</button>
        </div>
    }

    const updateFieldsOfInterests = () => {
        this.setState({
            isFieldsOfInterestsInEditMode: false,
            fieldsOfInterests: this.refs.theFieldsOfInterestsInput.value
        })
    }

    const renderFieldsOfInterestsDefaultView = () => {
        return <div onDoubleClick={this.switchFieldsOfInterestsEditMode} class="txtInput profileContent">
        {this.state.fieldsOfInterests}
    </div>
    }

    const handleClickDelete = () => {
        var jsonData = {
            "_id": {"$oid": this.state.userid},
            "email": {"data": this.state.schoolEmail, "display": true}, 
            "password": "this.state.password",
            "name": {"data": this.state.name, "display": true},
            "dateofbirth": {"data": this.state.dateOfBirth, "display": true},
            "gender": {"data": this.state.gender, "display": true},
            "Program": {"data": this.state.programOfStudy, "display": true},
            "Description": {"data": this.state.fieldsOfInterests, "display": true}
        }

        fetch('http://localhost:8080/profile', {
            method: 'DELETE', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(jsonData)
        })
    }


    

    return (
            <div>
                <h1 style={{position: "fixed", left: "30px", top: "20px"}}> Welcome, {name.data}</h1>
                
                <div class="name">
                    <text class="profileHeader">
                        Name
                    </text>
                    {
                        this.state.isNameInEditMode ? 
                        this.renderNameEditView() :
                        this.renderNameDefaultView()
                    }
                </div>

                <div class="gender">
                    <text class="profileHeader">
                        Gender
                    </text>
                    {
                        this.state.isGenderInEditMode ? 
                        this.renderGenderEditView() :
                        this.renderGenderDefaultView()
                    }
                </div>
                <div class="age">
                    <text class="profileHeader">
                        Age
                    </text>
                    {
                        this.state.isAgeInEditMode ? 
                        this.renderAgeEditView() :
                        this.renderAgeDefaultView()
                    }
                </div>
                <div class="dateOfBirth">
                    <text class="profileHeader">
                        Date of Birth
                    </text>
                    {
                        this.state.isDateOfBirthInEditMode ? 
                        this.renderDateOfBirthEditView() :
                        this.renderDateOfBirthDefaultView()
                    }
                </div>
                <div class="programOfStudy">
                    <text class="profileHeader">
                        Program of Study
                    </text>
                    {
                        this.state.isProgramOfStudyInEditMode ? 
                        this.renderProgramOfStudyEditView() :
                        this.renderProgramOfStudyDefaultView()
                    }
                </div>
                <div class="schoolEmail">
                    <text class="profileHeader">
                        School Email
                    </text>
                    {
                        this.state.isSchoolEmailInEditMode ? 
                        this.renderSchoolEmailEditView() :
                        this.renderSchoolEmailDefaultView()
                    }
                </div>
                <div class="fieldsOfInterests">
                    <text class="profileHeader">
                        Fields of Interests
                    </text>
                    {
                        this.state.isFieldsOfInterestsInEditMode ? 
                        this.renderFieldsOfInterestsEditView() :
                        this.renderFieldsOfInterestsDefaultView()
                    }
                </div>
                
                <Button text="Back" wid ="100px" col="orange" lft="30px" tp="750px"/>
                <Button text="Delete Account" func={this.handleClickDelete} wid="180px" col="red" lft="840px" tp="800px"/>
                <Link to="../../App" class="btn btn-orange signoutButton">Sign Out</Link>
            </div>
    
    );
}

export default PersonalProfile;