import { useState } from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import "./Workout.css"

const Workouts = (props) => {

    const [username, setUsername] = useState(props.username)
    const [plan, setPlan] = useState("");

    // Sending POST request to backend in order to retrieve the user's workout plan
    const getWorkouts = async(e) => {
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
            const existingPlan = data.userInfo.workoutPlan
            console.log(existingPlan)
            setPlan(existingPlan)
          }

          else{
            console.log("Error fetching user's workout plan.")
          }
    }

    // Sending PATCH request to backend to update user's workout plan
    const addWorkouts = async(e) => {
      e.preventDefault()

      const workoutPlan = plan

      const new_plan = {
        workoutPlan,
        username
      }

      const url = "http://127.0.0.1:5000/addWorkoutPlan"
        const options = {
            method:"PATCH",
            headers:{
              "Content-Type": "application/json"
            },
            body:JSON.stringify(new_plan)
          }
      
          const response = await fetch(url, options)

          if(response.status == 200 || response.status == 201){
            const data = await response.json()
            const workout_add_status = data.message
            alert(workout_add_status)
          }

          else{
            console.log("Failed to update new workouts")
          }
    }

    return(
        <>
        <div className="workouts">
           <form onSubmit={addWorkouts}>
                <button onClick={getWorkouts}> View {username}'s Workout Plan </button>
                <p id="planDisplay"> {plan} </p>
                
              <div className="submitWorkouts">
                <label id="updateLabel"> Update Workout Plan:  </label>
                <input type="text" id ="uname" value={plan} onChange={(e) => setPlan(e.target.value)} />
                <input type="submit" id="workoutSubmit" value="Update Workout"></input>
              </div>
            </form> 
            
        </div>
        </>
    )
}

export default Workouts