import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import Register from "./Register"
import HomePage from "./Home"
import AccountDetailsPage from "./AccountDetails"
import ReviewSystem from "./Review"

const LoginForm = (props) => {

  const username = props.u
  const setUsername = props.uset
  const password = props.p
  const setPassword = props.pset

  const navigate = useNavigate()
  
  // Sending POST request to backend to verify login credentials
  const handleSubmit = async (e) => {
    e.preventDefault()

    const loginCredentials = {
      username,
      password
    }

    const url = "http://127.0.0.1:5000/login"
    const options = {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(loginCredentials)
    }

    const response = await fetch(url, options)
    if(response.status == 200 || response.status == 201){
      const data = await response.json()
      const login_status = data.loginStatus
      console.log(login_status)

      if(login_status == "failed"){
        alert("Username and/or password is incorrect. Please try again.")
      }

      else{
        navigate("/home")
      }

    }

    else{
      console.log("Error retrieving login verification data")
    }
  }

  return(
    <>
      <div className='WebsiteTitle'>
      <h1> Welcome to the Fitness Members App!</h1>
      <h2> Please Login Below.</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <label> Username: </label>
        <input type="text" id ="uname" value={username} onChange={(e) => setUsername(e.target.value)} />
        
        <br></br>
        
        <label> Password: </label>
        <input type="password" id ="pass" value={password} onChange={(e) => setPassword(e.target.value)} />

        <br></br>

        <input type="submit" value ="Submit" id ="loginSubmit"></input>

        <br></br>
        <br></br>

        <label> Don't have an account? Sign up for a membership! </label>
        <button id="reg" onClick={() => navigate("/register")}> Sign up </button>

      </form>
    </>
  )
}


const App = () => {
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<LoginForm u = {username} p = {password} uset = {setUsername} pset = {setPassword}/>}/>
      
      <Route path = "/register" element={<Register />}/>

      <Route path = "/home" element={<HomePage username = {username}/>}/>

      <Route path = "/accountInfo" element={<AccountDetailsPage username = {username}/>}/>

      <Route path = "/reviews" element={<ReviewSystem username = {username}/>}/>
      
    </Routes> 
    </BrowserRouter>
  )
}

export default App
