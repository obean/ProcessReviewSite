import React, { Component, useState, useEffect } from "react";
import '../profile.css';
import Login from "./components/login.component";

export default class Profile extends Component {

  // constructor(props){
  //   super(props)
  //   this.state = {
  //       // firstName: '',
  //       // lastName: '',
  //       // email: '',
  //   }
  //   useEffect(() => {
  //     fetchItems();
  //   },[]);

  //   fetchReviews = async () => {
  //     const data = await fetch('https://fortnite-api.theapinetwork.com/upcoming/get');
  //     console.log(data);
  //   };
  // }
  render() {
    return (
      <div className="Profile">
        <h1>  hello world</h1>

        <div class="grid-container">
          <div class="grid-item"> <Login /> </div>
          <div class="grid-item">Reviews list</div>
          <div class="grid-item">Radar chart</div>
          <div class="grid-item">TBC</div>
        </div>

      </div>
    );
  };
};