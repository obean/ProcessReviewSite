import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import './reviewList.component.css'


function ReviewList(props) {

  const cancelThis = (id) => {
    fetch('http://localhost:9000/reviews/cancel', {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      }, 
        body: JSON.stringify({reviewId : id})
    })
  }

  return (
    <div className="reviews">
      <h3 className="review-header" data-text="Your booked Reviews">Your Booked Reviews</h3> 
       { props.reviews.map(review => (
      <ul class="single-counter-rule">
      <li key={review.id} className="repeating-counter-rule"> 
        <Link to={`reviews/${review.id}`} className="review-item">
          {review.booking_date}
          </Link>
          <button className="cancel-button" onClick={() => cancelThis(review.id)}>Cancel</button>
         </li>
         </ul>
       ))}
       <Link to={'/book-review'}> Book a review</Link>
    </div>
  );

}
export default ReviewList;