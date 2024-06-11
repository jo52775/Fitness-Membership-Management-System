import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import "./Modal.css"

const Modal = (props) => {
    const username = props.username
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [verifyNewPassword, setVerifyNewPassword] = useState("")

    const setModal = props.set
    const navigate = useNavigate()

      // Sending POST request to the backend to verify entered old password, then calling ensurePasswordMatch()
      const getOldPassword = async (e) => {
        e.preventDefault()
        
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
            const password_in_db = data.userInfo.password
            
            if(password_in_db != oldPassword){
                alert("Old password does not match existing records. Please re-enter old password.")
                return
            }

            else{
                ensurePasswordMatch()
            }
                
    }
        else{
            console.log("Failed to retrieve user's old password.")
        }
    }
    
    // Function that checks if new password and verify new password are matching. If so, it will call updateNewPassword()
    const ensurePasswordMatch = () => {
        if(newPassword == verifyNewPassword){
            updateNewPassword()
        }

        else{
            alert("New password and verification of new password do not match.")
            return
        }
    }
 
    // Sending PATCH request to backend to update user's password with new entered password.
    const updateNewPassword = async() => {
        const passwordUpdated = {
            username,
            newPassword
        }
    
        const url = "http://127.0.0.1:5000/updatePassword"
        const options = {
            method:"PATCH",
            headers:{
              "Content-Type": "application/json"
            },
            body:JSON.stringify(passwordUpdated)
          }
      
          const response = await fetch(url, options)
    
          if(response.status == 200 || response.status == 201){
            const data = await response.json()
            const password_message = data.message
            
            if(password_message == "Empty field"){
                alert("Please fill in all required fields.")
                return
            }

            else if(password_message == "New password is Old password"){
                alert("New password cannot be the same as existing password, please try again.")
                return
            }

            else{
                alert("Password Successfully Updated! Please Login with new password.")
                navigate("/")
            }
                
    }
        else{
            console.log("Backend response failed for password update request.")
        }
    }
  
    return(
        <div className='modalFormat'>
        <form onSubmit={getOldPassword}>
            <button id='modalBackButton' onClick={() => setModal(false)}> X </button>
            
            <div className='oldPass'>
                <label className='resetLabel'> Enter old password: </label>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            
            <div className='newPass'>
                <label className='resetLabel'> Enter new password: </label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>

            <div className='verifyNewPass'>
                <label className='resetLabel'> Verify new password: </label>
                <input type="password" value={verifyNewPassword} onChange={(e) => setVerifyNewPassword(e.target.value)} />
            </div>
            
            <button type='submit' id='passwordResetButton'> Submit </button>
        </form>
        
        </div>
    )
}

export default Modal