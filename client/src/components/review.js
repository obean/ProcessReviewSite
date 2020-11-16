import React, { Component, useState, useEffect } from "react";
import '../App.css';
import ReviewList from './reviewList.component'
import { Redirect } from 'react-router';


function Review() {
    useEffect(() => {
        fetchReview();
    }, []);

    const [review, setReview] = useState({});

    const fetchReview = async () => {
        const data = await fetch('http://localhost:9000/reviews/get-review?id=3');
        const review = await data.json();
        setReview(review)
    }


    return (
        <div>
            <h1> Review Page </h1>
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

}

export default Review;
