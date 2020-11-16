import React, { Component, useState, useEffect } from "react";
import '../App.css';
import ReviewList from './reviewList.component'
import { Redirect } from 'react-router';


function Review({ match }) {

    useEffect(() => {
        fetchReview();
        console.log(match)
    }, []);

    const [review, setReview] = useState({});

    const fetchReview = async (res) => {
        const data = await fetch('http://localhost:9000/reviews/all');
        const review = await data.json();
        console.log(review)
        setReview(review)
    };

    return (
        <div>
            <h1> Review Page </h1>
        </div>
    );

}

export default Review;