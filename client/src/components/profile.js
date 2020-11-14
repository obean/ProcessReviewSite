import React, { Component, useState, useEffect } from "react";
import '../profile.css';
import ReviewList from './reviewList.component'
import LineChart from './lineChart.component'

function Profile() {

    return (
      <div className="Profile">
        <h1>  hello world</h1>

        <div className="grid-container">
          <div className="grid-item"> line chart </div>
          <div className="grid-item"> <ReviewList /> </div>
          <div className="grid-item">Radar chart</div>
          <div className="grid-item"><LineChart /></div>
        </div>

      </div>
    );
};

export default Profile;