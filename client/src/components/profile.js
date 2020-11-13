import React, { Component, useState, useEffect } from "react";
import '../profile.css';
import './reviewList.component'


export default class Profile extends Component {


  render() {
    return (
      <div className="Profile">
        <h1>  hello world</h1>

        <div class="grid-container">
          <div class="grid-item"> line chart </div>
          <div class="grid-item"> <reviewList /> </div>
          <div class="grid-item">Radar chart</div>
          <div class="grid-item">TBC</div>
        </div>

      </div>
    );
  };
};