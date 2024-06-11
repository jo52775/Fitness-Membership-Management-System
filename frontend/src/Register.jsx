import { useState } from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import "./Register.css"

const RegisterForm = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[email, setEmail] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[birthday, setBirthday] = useState("");
    
    const [membershipType, setMembershipType] = useState("regular")
    const [checkedStatus, setCheckedStatus] = useState(false)

    const navigate = useNavigate()
    
    // Function for choosing membership type based on current checkbox status
    const handleCheckbox = () => {
      const updatedCheckedStatus = !checkedStatus
      setCheckedStatus(updatedCheckedStatus)
      
      if(updatedCheckedStatus == true){
        setMembershipType("deluxe")
      }

      else{
        setMembershipType("regular")
      }
      }

    // Sending POST request to backend to create a new user
    const handleRegisterSubmit = async (e) => {
      e.preventDefault()
  
      const Credentials = {
        username,
        password,
        email,
        firstName,
        lastName,
        birthday,
        membershipType
      }
  
      const url = "http://127.0.0.1:5000/register"
      const options = {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(Credentials)
      }
  
      const response = await fetch(url, options)
      
      if(response.status == 400){
        const data = await response.json()
        const register_error = data.message
        console.log(register_error)
  
        if(register_error == "Unfilled"){
          alert("Please fill in all required fields.")
        }
  
        else{
          alert("Username/email is already taken, please enter different credentials.")
        }
  
      }
  
      else{
        const data = await response.json()
        const register_message = data.message
        console.log(register_message)
        alert("Registration successful!")
        navigate("/")
      }
    }
  
    return(
      <>
        <div className='Register'>
          <h1 id="registerHeader"> Register an account to get started.</h1>
          
          <form onSubmit={handleRegisterSubmit}>
            
            <div className='fieldDiv'>
              <label> Username: </label>
              <input type="text" id="uname" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            
            <div className='fieldDiv'>
              <label> Password: </label>
              <input type="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            <div className='fieldDiv'>
              <label> Email: </label>
              <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <div className='fieldDiv'>
              <span>
              <label> First Name: </label>
              <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            
              <label> Last Name: </label>
              <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </span>
            </div>
            
            <div className='fieldDiv'>
              <label> Date of Birth: </label>
              <input type="text" id="dob" value={birthday} placeholder="YYYY-MM-DD" onChange={(e) => setBirthday(e.target.value)} />
            </div>
            
            <div className='fieldDiv'>
              <label> Would you like to be a Deluxe Member? </label>
              <input type="checkbox" id="member" checked={checkedStatus} onChange={handleCheckbox}></input>
            </div>

            <button type="submit" value="Submit" id="registerSubmit"> Register </button>
    
          </form>
        </div>
      </>
    )
  }


const Register = () => {

    return (
      
      <RegisterForm />
      
    )
  }
  
  export default Register