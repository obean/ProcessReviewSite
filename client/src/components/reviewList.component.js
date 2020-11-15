import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

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
    <div>
      <h3>Your booked Reviews</h3> 
       { props.reviews.map(review => (
      <li key={review.id}>
        <Link to={`reviews/${review.id}`}>
          {review.booking_date}
          </Link>
          <button onClick={() => cancelThis(review.id)}>Cancel</button>
         </li>
       ))}
       <Link to={'/book-review'}> Book a review</Link>
    </div>
  );

}
export default ReviewList;