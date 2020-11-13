import React, { useState, useEffect } from 'react';


function ReviewList() {
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const data = await fetch('https://fortnite-api.theapinetwork.com/upcoming/get');
    console.log(data);
  };


  return (
    <div>
      <h1> </h1>
    </div>
  );

}
export default ReviewList;