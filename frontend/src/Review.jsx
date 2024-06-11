import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import "./Review.css"

const ReviewsHandler = (props) => {
    const [reviewList, setReviewList] = useState([])
    const [content, setContent] = useState("")
    const [username, setUsername] = useState(props.username)
    const navigate = useNavigate()
    
    useEffect(() => {
        getReviews()
    }, [])

    // Sending GET request to backend to retrieve all reviews
    const getReviews = async() => {

        const url = "http://127.0.0.1:5000/getReviews"
        const response = await fetch(url)

        if(response.status == 200 || response.status == 201){
            const data = await response.json()
            const review_data = data.reviews
            setReviewList(review_data.reverse())
        }

        else{
            console.log("Failed to retrieve user review data.")
        }
    }

    // Sending a POST request to the backend to create a user review, then calling getReviews again to display the review.
    const postReview = async(e) => {
        e.preventDefault()

        const reviewInfo = {
            username,
            content
        }

        const url = "http://127.0.0.1:5000/postReview"
        const options = {
            method:"POST",
            headers:{
            "Content-Type": "application/json"
            },
            body:JSON.stringify(reviewInfo)
        }
  
        const response = await fetch(url, options)

        if(response.status == 200 || response.status == 201){
            const data = await response.json()
            if(data.message == "Nothing entered"){
                alert("Cannot post empty review.")
                getReviews()
            }
            
            else if(data.message == "Review posted!"){
                console.log("Review posted successfully.")
                getReviews()
            }

            else{
                console.log("Error posting review.")
            }
        }
    }

    const backToHome = (e) =>{
        e.preventDefault()
        navigate("/home")
    }

    return(
        <>
        <div className='backButton'>
            <button onClick={backToHome}> Back to Home </button>
        </div>

        <div className='reviewsBox'>
            {reviewList.map((review) => (<ReviewCard user={review.user} content={review.content}/>))}
        </div>

        <div className='reviewForm'>
            <form onSubmit={postReview}>
                <h2 id='writeHead'> Write a review!</h2>
                <textarea type='text' id='reviewTypeBox' value={content} maxLength={150} onChange={(e) => setContent(e.target.value)}></textarea>
                <button type='submit' id='reviewSubmit'> Post Review </button>
            </form>
        </div>
        </>
    )
}

const ReviewCard = (props) => {
    return(
        <div className='reviewCard'>
            <h3 id='reviewCardHeader'> {props.user} </h3>
                <p id='reviewCardContent'> {props.content} </p>
        </div>
    )
}

const ReviewSystem = (props) => {
    return(
        <div className='reviewSystem'>
            <h1 id='reviewHead'> User Reviews </h1>
                <ReviewsHandler username={props.username}/>
        </div>
    )
}


export default ReviewSystem