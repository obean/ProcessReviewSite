import React, { Component, useState, useEffect } from "react";
import '../profile.css';
import ReviewList from './reviewList.component'
import RadarChartRecharts from "./radarChart.component";
import LineChart from './lineChart.component'
import BarChartRechart from './barChart.component'
import DatePicker from './setAvailability.component'
import AwaitingFeedback from  './upcomingRev.component.js'

import { Redirect } from 'react-router'
import { useHistory } from "react-router"

function Profile() {
  let history = useHistory()
  useEffect(() => {
    fetchUser();
  }, [])
 
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState([])


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
    }
  } catch(e) {console.log(e)}
  };
 
    if(!user.isAdmin){
     return (
      <div className="Profile">
        <h1>  hello {user.username}</h1>
        <div className="grid-container">
          <div className="grid-item"> <BarChartRechart/> </div>
          <div className="grid-item"> <ReviewList reviews={reviews} /> </div>
          <div className="grid-item"> <RadarChartRecharts />  </div> 
          <div className="grid-item"> <LineChart /></div>
        </div>
       
      </div>
    )}else {
      return (
        <div className="Profile"> 
          <div className="grid-item">  <DatePicker/></div>
          <div className="grid-item">  <AwaitingFeedback/></div>
        </div>
      )
    }
}


export default Profile;