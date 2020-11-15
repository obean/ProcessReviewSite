import React, { Component, useState, useEffect } from "react";
import '../profile.css';
import ReviewList from './reviewList.component'
import RadarChartRecharts from "./radarChart.component";
import LineChart from './lineChart.component'

function Profile() {

  useEffect(() => {
    fetchReviews();
  }, []);

  const [reviews, setReviews] = useState([]);

  const fetchReviews = async (res) => {
    const data = await fetch('http://localhost:9000/reviews/all');
    const reviews = await data.json();
    console.log(reviews)
    setReviews(reviews)
  };


    return (
      <div className="Profile">
        <h1>  hello world</h1>

        <div className="grid-container">
    
          <div className="grid-item"> line chart </div>
          <div className="grid-item"> <ReviewList reviews={reviews} /> </div>
          <div className="grid-item"> <RadarChartRecharts />  </div>
          <div className="grid-item"> <LineChart /></div>
        
        </div>
       
      </div>
    );
};

export default Profile;