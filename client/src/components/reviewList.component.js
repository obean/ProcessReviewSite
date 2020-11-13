import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function ReviewList() {
  useEffect(() => {
    fetchReviews();
  }, []);

  const [reviews, setReviews] = useState([]);

  const fetchReviews = async (res) => {
    const data = await fetch('http://localhost:9000/reviews/all');
    const reviews = await data.json();
    console.log(reviews)
    setReviews(reviews)
  };


  return (
    <div>
       { reviews.map(review => (
      <li key={review.id}>
        <Link to={'reviews/'}>
          {review.booking_date}
          </Link>
         </li>
       ))}
    </div>
  );

}
export default ReviewList;