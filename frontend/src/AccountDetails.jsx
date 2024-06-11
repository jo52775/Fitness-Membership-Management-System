import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import Modal from "./Modal.jsx"
import "./AccountDetails.css"

const AccountInfoDisplay = (props) => {
    const [username, setUsername] = useState(props.username)
    const [email, setEmail] = useState("")
    const [membershipType, setMembershipType] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")

    const[modal, setModal] = useState(false)

    const navigate = useNavigate()

    // Function to return to home page after clicking back button
    const goBackHome = (e) =>{
        e.preventDefault()
        navigate("/home")
    }

    useEffect(() => {
        getUserInformation()
    })

    // Sending POST request to backend to retrieve user's information for display.
    const getUserInformation = async() =>{
        
        const user = {
            username
        }

        const url = "http://127.0.0.1:5000/getUserInfo"
        const options = {
            method:"POST",
            headers:{
              "Content-Type": "application/json"
            },
            body:JSON.stringify(user)
          }
      
          const response = await fetch(url, options)

          if(response.status == 200 || response.status == 201){
            const data = await response.json()
            setEmail(data.userInfo.email)
            setFirstName(data.userInfo.firstName)
            setMembershipType(data.userInfo.membershipType)
            setLastName(data.userInfo.lastName)
            setBirthday(data.userInfo.birthday)
    }

        else{
            console.log("Failed to retrieve user information.")
        }
    }

    return(
        <>
        <button id="backButton" onClick={goBackHome}> Back to Home </button>

        <div className='InfoDisplay'>
        <h1 id="infoDisplay"> My Account Information </h1>

        <p className="display"> Username: {username} </p>

        <p className="display"> Email Address:  {email} </p>

        <p className="display"> Membership:  {membershipType} </p>

        <p className="display"> Full Name:  {firstName} {lastName} </p>

        <p className="display"> Date of Birth:  {birthday} </p>
        </div>

        <div className='resetPassword'>
            <button id="resetPasswordButton" onClick={() => {setModal(true)}}> Reset Password </button>
            {modal==true && <Modal username = {username} set={setModal}/>}
        </div>
        </>
)
}

const AccountDetailsPage = (props) => {
    return(
        <>
        <AccountInfoDisplay username={props.username}/>
        </>
    )
}

export default AccountDetailsPage