import { useState } from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import Workouts from "./Workout"
import "./Home.css"

const NavBar = (props) => {

const navigate = useNavigate()

const handleAccountDetailsLink = (e) =>{
    e.preventDefault()
    navigate("/accountInfo")
}

const handleReviewsLink = (e) =>{
    e.preventDefault()
    navigate("/reviews")
}

    return(
            <>
            <div className = "nav">
            
            <h2 id="welcomeHome"> Welcome to your Home Page, {props.username}!</h2>
            <table width="1000">
                <tr>
                    <th className="link" width="250"> <a onClick={handleAccountDetailsLink}> My Account Details </a> </th>
                    <th className="link"width="250"> <a onClick={handleReviewsLink}> Reviews </a> </th>
                    <th className="link" width="250"> <a href="/"> Logout </a> </th>
                
                </tr>
            </table>
            </div>
            </>
    )
}

const About = () => {
    return(
        <>
        <div className="about">
            <h2 id="aboutHeader"> About </h2>
            <p id="aboutParagraph"> This website is dedicated to improving your overall fitness and managing your membership with the gym. Our services include: <br></br> 
                            <span id="aboutList">
                            - A workout plan to remind yourself about personal goals/objectives <br></br>
                            - Account Registration Details and Password Reset feature <br></br>
                            - Review system for users to both post and read about reviews pertaining to the gym and the website </span> </p>
            <p id="thank_you"> Thank you for using this website!</p>

        </div>
        </>
    )
}


const HomePage = (props) => {
    return(
        <>
    < NavBar username={props.username}/>
    < About />
    < Workouts username={props.username}/>    
        
        
        
        </>
    )
}


export default HomePage