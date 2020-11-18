import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function AwaitingFeedback(props) {
  useEffect(() => {
    fetchUser()
  },[])

  const [user, setUser] = useState(props)
  const [reviews, setReviews] = useState([]);

  const fetchUser = async (res) => {
    try {
    const data = await fetch('http://localhost:9000/users/logged-in').catch((err) => console.log(err));
    const user = await data.json();
    if(await user == "unauthorised") {
      console.log(user)
    }else {
      setUser(user)
      const revData = await fetch(`http://localhost:9000/reviews/all?reviewerId=${user.id}`);
      const reviews = await revData.json();
      console.log(reviews)
      setReviews(reviews)
    }
  } catch(e) {console.log(e)}
  };

  const fieldsEmpty = (review) => {
   return Object.values(review).slice(2,18).indexOf(null) != -1 ? true : false
  }


  return (
    <div>
      <h3>These reviews haven't had feedback yet</h3> 
      
      {reviews.filter(review => fieldsEmpty(review)).map(review => <li key={review.id}>
        <Link to={`reviews/${review.id}`}>
          {review.booking_date}
          </Link>
         </li>)}
    </div>
  )


}
export default AwaitingFeedback