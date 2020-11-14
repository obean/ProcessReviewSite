import React, { Component, useState, useEffect } from "react";
import '../profile.css';
import ReviewList from './reviewList.component'


function Profile() {
  useEffect(() => {
    fetchUser();
  }, [])

  const fetchUser = async (res) => {
    const data = await fetch('http://localhost:9000/users/logged-in');
    const user = await data.json();
    console.log(user)
    setUser(user)
  }
  const [user, setUser] = useState([])
  
    return (
      <div className="Profile">
        <h1>  hello world</h1>

        <div className="grid-container">
          <div className="grid-item"> line chart </div>
          <div className="grid-item"> <ReviewList /> </div>
          <div className="grid-item">Radar chart</div>
          <div className="grid-item">TBC</div>
        </div>

      </div>
    );
};

export default Profile;