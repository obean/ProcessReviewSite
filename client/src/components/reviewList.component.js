import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function ReviewList(props) {

  return (
    <div>
       { props.reviews.map(review => (
      <li key={review.id}>
        <Link to={`reviews/${review.id}`}>
          {review.booking_date}
          </Link>
         </li>
       ))}
    </div>
  );

}
export default ReviewList;