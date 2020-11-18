import React, { Component, useState, useEffect } from "react";


function BookReview() {
  useEffect(() => {
    fetchUser();
  }, [])
  useEffect(() => {
    fetchBookings();
  }, []);



  const [avReviews, setAvReviews] = useState([])
  const [user, setUser] = useState([])

  const fetchBookings = async (res) => {
    const data = await fetch('/reviews/book');
    const avReviews = await data.json();
    setAvReviews(avReviews)
  }

  const fetchUser = async (res) => {
    const data = await fetch('/users/logged-in');
    const user = await data.json();
    console.log(user)
    setUser(user)
  }

  const bookThis =  (id) => {
    fetch('/reviews/book', {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      }, 
        body: JSON.stringify({booking: {user: user.id, review: id}})
    })
  }

  return (
    
    <div className="availableReviews">
      {avReviews.map(review => (
        <li key={review.id}>
          {review.booking_date}
          <button onClick={() => bookThis(review.id)}> Book</button>
        </li>
      ))
      
      }
    </div>

    
  )
}
export default BookReview;