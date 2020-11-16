import React, { Component, useState, useEffect } from "react";
import '../App.css';
import ReviewList from './reviewList.component'
import { Redirect } from 'react-router';


function Review() {
    useEffect(() => {
        fetchReview();
    }, []);

    const [review, setReview] = useState({});

    const fetchReview = async () => { };


    return (
        <div>
            <h1> Review Page </h1>
        </div>
    );

}

export default Review;
