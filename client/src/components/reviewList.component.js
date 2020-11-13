import React, { useState, useEffect } from 'react';


function ReviewList() {
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async (res) => {
    const data = await fetch('http://localhost:9000/reviews/all');
    const reviews = await data.json();
    console.log(reviews)
  };


  return (
    <div>
      <h1> yooo!</h1>
    </div>
  );

}
export default ReviewList;