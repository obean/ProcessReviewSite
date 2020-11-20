import React, { Component, useState, useEffect } from "react";
import "../book.css"


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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ booking: { user: user.id, review: id } })
    })
  }

  const DropDown = () => {
    setShowResults(!showResult)
  }

  const [showResult, setShowResults] = useState(false)

  return (

    <div className="availableReviews" onClick={() => DropDown()}> AvailableReviews <i className="material-icons">unfold_more</i>
      {avReviews.map(review => (
        <p class="book-border" key={review.id}>
          {showResult ? <p> {review.booking_date}
            <button class="book-button" onClick={() => bookThis(review.id)}> Book </button>
          </p> : null}
        </p>
      ))

      }
    </div>


  )
}
export default BookReview;