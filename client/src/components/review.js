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
        const data = await fetch('http://localhost:9000/get-review?id=3');
        const review = await data.json();
        console.log(review)
    }


    return (
        <div>
            <h1> Review Page </h1>
        </div>
    );

}

export default Review;
