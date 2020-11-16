import React, { Component, useState, useEffect } from "react";
import '../profile.css';
import ReviewList from './reviewList.component'
import RadarChartRecharts from "./radarChart.component";
import LineChart from './lineChart.component'
import { Redirect } from 'react-router'
import { useHistory } from "react-router"

function Profile() {
  let history = useHistory()
  useEffect(() => {
    fetchUser();
  }, [])
 
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState([])
  const [data, setRatings] = useState([]);

  const fetchUser = async (res) => {
    try {
    const data = await fetch('http://localhost:9000/users/logged-in').catch((err) => console.log(err));
    const user = await data.json();
    if(await user == "unauthorised") {
      history.push("/sign-in")
    }else {
      setUser(user)
      const revData = await fetch(`http://localhost:9000/reviews/all?id=${user.id}`);
      const reviews = await revData.json();
      console.log(reviews)
      setReviews(reviews)
      formatter()
    }
  } catch(e) {console.log(e)}
  };
 
  const formatter = () => {
    let index = 0
    const data = reviews.map(review => {
      for (const [old_key] of Object.entries(review)) {
        if (old_key.endsWith("_rating")) {
          let new_key = old_key.slice(0, -7);
          review[new_key] = review[old_key];
          delete review[old_key];
        } else {
          delete review[old_key]
        }
      }
    review['name'] = index + 1
    index++;
    });
      setRatings(data);
  }
  
    return (
      <div className="Profile">
        <h1>  hello {user.username}</h1>

        <div className="grid-container">
    
          <div className="grid-item"> line chart </div>
          <div className="grid-item"> <ReviewList reviews={reviews} /> </div>
          <div className="grid-item"> <RadarChartRecharts />  </div>
          <div className="grid-item"> <LineChart reviews={data} /></div>
        
        </div>
       
      </div>
    );
};

export default Profile;