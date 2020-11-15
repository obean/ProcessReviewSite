import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function ReviewList(props) {

  return (
    <div>
       { props.reviews.map(review => (
      <li key={review.id}>
        <Link to={'reviews/'}>
          {review.booking_date}
          </Link>
         </li>
       ))}
       {props.id}
    </div>
  );

}
export default ReviewList;