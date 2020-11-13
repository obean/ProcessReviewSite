import React, { useState, useEffect } from 'react';


function ReviewList(props) {
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const data = await fetch('https://fortnite-api.theapinetwork.com/upcoming/get');
    console.log(data);
  };


  return (
    <div>
      <h1> yooo!</h1>
    </div>
  );

}
export default ReviewList;