import React, { Component, useState, useEffect } from "react";
import '../App.css';
import ReviewList from './reviewList.component'
import { Redirect, useParams } from 'react-router';
import { userInfo } from "os";
import { useHistory } from "react-router"
// HELLO COURTENAY

function Review() {
    let history = useHistory()
    useEffect(() => {
        fetchReview();
    }, []);
    useEffect(() => {
        fetchUser();
    }, [])

    const [user, setUser] = useState([])

  const fetchUser = async (res) => {
    try {
      const data = await fetch('http://localhost:9000/users/logged-in').catch((err) => console.log(err));
      const user = await data.json();
      if (await user == "unauthorised") {
        history.push("/sign-in")
      } else {
        setUser(user)
      }
    } catch(e) {console.log(e)}
}

    const [review, setReview] = useState({});
    const { id } = useParams();
    console.log(id)
    const fetchReview = async () => {
        const data = await fetch(`http://localhost:9000/reviews/get-review?id=${id}`);
        const review = await data.json();
        
        setReview(review)
        console.log(review)
    }

    const handleChange = (e) => {
        if(e.target.name.split('_')[1] == "rating"){
            parseInt(e.target.value) > 100 ? setReview({[e.target.name]: 100}) : setReview({[e.target.name]: e.target.value})
        }
        else{
        setReview({[e.target.name]: e.target.value})
        }
    }
    const handleSubmit =  () => {
        fetch('http://localhost:9000/reviews/submit-feedback', {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            }, 
            body: JSON.stringify({review, id: id})
        }).then(result => console.log(result))
    }

    
    if(!user.isAdmin){return (
        <div>
            <h1> Review page </h1>
            <div id='BookingDate'>
                <h2>date</h2>
                <p> {review.booking_date}</p>
            </div>

            <div id='GeneralFeedback'>
                <h2> General Feedback </h2>
                <p> {review.general_feedback} </p>
            </div>

            <div id='TDD_description'>
                <h2> TDD Description {review.TDD_rating}/100</h2>
                <p> {review.TDD_description} </p>
            </div>

            <div id='Fluency_description'>
                <h2> Fluency Description {review.Fluency_rating}/100 </h2>
                <p> {review.Fluency_description} </p>
            </div>

            <div id='Debug_description'>
                <h2> Debug Description {review.Debug_rating}/100 </h2>
                <p> {review.Debug_description} </p>
            </div>

            <div id='Model_description'>
                <h2> Model Description {review.Model_rating}/100 </h2>
                <p> {review.Model_description} </p>
            </div>

            <div id='Refactor_description'>
                <h2> Refactor Description {review.Refactor_rating}/100 </h2>
                <p> {review.Refactor_description} </p>
            </div>

            <div id='Agile_description'>
                <h2> Agile Description {review.Agile_rating}/100 </h2>
                <p> {review.Agile_description} </p>
            </div>

            <div id='Maintainability_description'>
                <h2> Maintainability Description {review.Maintainability_rating}/100 </h2>
                <p> {review.Maintainability_description} </p>
            </div>


        </div>
    );
    }else {
        return ( 

          
            <div>
                
                <h1> Review Page </h1>
                <div id='BookingDate'>
                    <h2>date</h2>
                    <p> {review.booking_date}</p>
                </div>

                <div id="submit_button">
                    <button onClick={() => handleSubmit()}>
                        Submit Feedback
                    </button>
                </div> 
                 

          
    
                <div id='GeneralFeedback'>
                    <h2> General Feedback </h2>
                    <textarea
                    name="general_feedback"
                    onChange={(e) => handleChange(e)}
                    rows={5}
                    cols={200}
                    value={review.general_feedback}
                />  
                </div>
    
                <div id='TDD_description'>
                    <h2> TDD Description>/h2></h2>
                        <label fontSize="20px">
                         Set Proficiency score:
                         </label>
                         <textarea 
                                rows={1}
                                cols={3}
                                onChange={(e) => handleChange(e)}
                                name="TDD_rating"
                                maxLength="3"
                                value={review.TDD_rating}
                        />
                        <label>/100</label>
                         <br/>
                    <textarea
                              rows={5}
                              cols={200}
                              onChange={(e) => handleChange(e)}
                              name="TDD_description"
                    value={review.TDD_description}
                    />  
                </div>
    
                <div id='Fluency_description'>
                <h2> Fluency Description>/h2></h2>
                        <label fontSize="20px">
                         Set Proficiency score:
                         </label>
                         <textarea 
                                rows={1}
                                cols={3}
                                onChange={(e) => handleChange(e)}
                                name="Fluency_rating"
                                maxLength="3"
                                value={review.Fluency_rating}
                        />
                        <label>/100</label>
                         <br/>
                    <textarea
                              rows={5}
                              cols={200}
                              onChange={(e) => handleChange(e)}
                              name="Fluency_description"
                    value={review.Fluency_description}
                    />  
                </div>
    
                <div id='Debug_description'>
                <h2> Debug Description>/h2></h2>
                <label fontSize="20px">
                         Set Proficiency score:
                         </label>
                         <textarea 
                                rows={1}
                                cols={3}
                                onChange={(e) => handleChange(e)}
                                name="Debug_rating"
                                maxLength="3"
                                value={review.Debug_rating}
                        />
                        <label>/100</label>
                         <br/>
                    <textarea
                              rows={5}
                              cols={200}
                              onChange={(e) => handleChange(e)}
                              name="Debug_description"
                    value={review.Debug_description}
                    /> 
                </div>
    
                <div id='Model_description'>
                <h2> Model Description>/h2></h2>
                <label fontSize="20px">
                         Set Proficiency score:
                         </label>
                         <textarea 
                                rows={1}
                                cols={3}
                                onChange={(e) => handleChange(e)}
                                name="Model_rating"
                                maxLength="3"
                                value={review.Model_rating}
                        />
                        <label>/100</label>
                         <br/>
                    <textarea
                              rows={5}
                              cols={200}
                              onChange={(e) => handleChange(e)}
                              name="Model_description"
                    value={review.Model_description}
                    /> 
                </div>
    
                <div id='Refactor_description'>
                <h2> Refactor Description>/h2></h2>
                <label fontSize="20px">
                         Set Proficiency score:
                         </label>
                         <textarea 
                                rows={1}
                                cols={3}
                                onChange={(e) => handleChange(e)}
                                name="Refactor_rating"
                                maxLength="3"
                                value={review.Refactor_rating}
                        />
                        <label>/100</label>
                         <br/>
                    <textarea
                              rows={5}
                              cols={200}
                              onChange={(e) => handleChange(e)}
                              name="Refactor_description"
                    value={review.Refactor_description}
                    /> 
                </div>
    
                <div id='Maintainability_description'>
                <h2> Maintainability Description>/h2></h2>
                <label fontSize="20px">
                         Set Proficiency score:
                         </label>
                         <textarea 
                                rows={1}
                                cols={3}
                                onChange={(e) => handleChange(e)}
                                name="Maintainability_rating"
                                maxLength="3"
                                value={review.Maintainability_rating}
                        />
                        <label>/100</label>
                         <br/>
                    <textarea
                              rows={5}
                              cols={200}
                              onChange={(e) => handleChange(e)}
                              name="Maintainability_description"
                    value={review.Maintainability_description}
                    /> 
                </div>
    
    
            </div>
        )
    }

}

export default Review;
