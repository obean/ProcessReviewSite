import React, { Component, useState, useEffect } from "react";
import '../App.css';
import ReviewList from './reviewList.component'
import { Redirect, useParams } from 'react-router';
import { userInfo } from "os";
import { useHistory } from "react-router"
// HELLO COURTENAY

function Review() {
    let history = useHistory()
    useEffect(() => {
        fetchReview();
    }, []);
    useEffect(() => {
        fetchUser();
    }, [])

    const [user, setUser] = useState([])

    const fetchUser = async (res) => {
        try {
            const data = await fetch('http://localhost:9000/users/logged-in').catch((err) => console.log(err));
            const user = await data.json();
            if (await user == "unauthorised") {
                history.push("/sign-in")
            } else {
                setUser(user)
            }
        } catch (e) { console.log(e) }
    }

    const [review, setReview] = useState({});
    const { id } = useParams();
    console.log(id)
    const fetchReview = async () => {
        const data = await fetch(`http://localhost:9000/reviews/get-review?id=${id}`);
        const review = await data.json();

        setReview(review)
        console.log(review)
    }

    const handleChange = (e) => {
        if (e.target.name.split('_')[1] == "rating") {
            parseInt(e.target.value) > 100 ? setReview({ [e.target.name]: 100 }) : setReview({ [e.target.name]: e.target.value })
        }
        else {
            setReview({ [e.target.name]: e.target.value })
        }
    }
    const handleSubmit = () => {
        fetch('http://localhost:9000/reviews/submit-feedback', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ review, id: id })
        }).then(result => console.log(result))
    }

    const hideGeneneralFeedback = () => {
        setShowResults(!showResult)
    }

    const hideTddDescription = () => {
        setShowResultsTdd(!showTdd)
    }

    const hideFluencyDescription = () => {
        setShowResultsFluency(!showFluency)
    }

    const hideDebugDescription = () => {
        setShowResultsDebug(!showDebug)
    }

    const hideModelDescription = () => {
        setShowResultsModel(!showModel)
    }

    const hideRefactorDescription = () => {
        setShowRefactor(!showRefactor)
    }

    const hideAgileDescription = () => {
        setShowResultsAgile(!showAgile)
    }

    const hideMaintainabilityDescription = () => {
        setShowResultsMaintain(!showMaintain)
    }

    const [showResult, setShowResults] = useState(false)
    const [showTdd, setShowResultsTdd] = useState(false)
    const [showDebug, setShowResultsDebug] = useState(false)
    const [showFluency, setShowResultsFluency] = useState(false)
    const [showModel, setShowResultsModel] = useState(false)
    const [showRefactor, setShowRefactor] = useState(false)
    const [showAgile, setShowResultsAgile] = useState(false)
    const [showMaintain, setShowResultsMaintain] = useState(false)

    if (!user.isAdmin) {
        return (
            <div>
                <h1> Review page </h1>
                <div class="review_head" id='BookingDate'>
                    <h2>date</h2>
                    <p> {review.booking_date}</p>
                </div>

                <div id='GeneralFeedback'>
                    <h2 onClick={() => hideGeneneralFeedback()} > General Feedback </h2>
                    {showResult ? <p> {review.general_feedback} </p> : null}
                </div>

                <div id='TDD_description'>
                    <h2 class="review_head" onClick={() => hideTddDescription()}> TDD Description {review.TDD_rating}/100</h2>
                    {showTdd ? <p> {review.TDD_description} </p> : null}
                </div>

                <div id='Fluency_description'>
                    <h2 class="review_head" onClick={() => hideFluencyDescription()}> Fluency Description {review.Fluency_rating}/100 </h2>
                    {showFluency ? <p> {review.Fluency_description} </p> : null}
                </div>

                <div id='Debug_description'>
                    <h2 class="review_head" onClick={() => hideDebugDescription()}> Debug Description {review.Debug_rating}/100 </h2>
                    {showDebug ? <p> {review.Debug_description} </p> : null}
                </div>

                <div id='Model_description'>
                    <h2 class="review_head" onClick={() => hideModelDescription()}> Model Description {review.Model_rating}/100 </h2>
                    {showModel ? <p> {review.Model_description} </p> : null}
                </div>

                <div id='Refactor_description'>
                    <h2 class="review_head" onClick={() => hideRefactorDescription()}> Refactor Description {review.Refactor_rating}/100 </h2>
                    {showRefactor ? <p> {review.Refactor_description} </p> : null}
                </div>

                <div id='Agile_description'>
                    <h2 class="review_head" onClick={() => hideAgileDescription()}> Agile Description {review.Agile_rating}/100 </h2>
                    {showAgile ? <p> {review.Agile_description} </p> : null}
                </div>

                <div id='Maintainability_description'>
                    <h2 class="review_head" onClick={() => hideMaintainabilityDescription()}> Maintainability Description {review.Maintainability_rating}/100 </h2>
                    {showMaintain ? <p> {review.Maintainability_description} </p> : null}
                </div>


            </div>
        );
    } else {
        return (


            <div>

                <h1 class="review_head"> Review: {review.booking_date} </h1>
                {/* <div id='BookingDate'>
                    <h2 class="review_head">date</h2>
                    <h2 class="review_head"> {review.booking_date}</h2>
                </div> */}

                <div id="submit_button">
                    <button onClick={() => handleSubmit()}>
                        Submit Feedback
                    </button>
                </div>




                <div id='GeneralFeedback'>
                    <h2 class="review_head"> General Feedback </h2>
                    <textarea
                        class="text_area_review"
                        name="general_feedback"
                        onChange={(e) => handleChange(e)}
                        rows={5}
                        cols={200}
                        value={review.general_feedback}
                    />
                </div>

                <div id='TDD_description'>
                    <h2 class="review_head"> TDD Description</h2>
                    <label class="review_label" fontSize="110%">
                        Set Proficiency score:
                         </label>
                    <textarea
                        class="text_area_score"
                        rows={1}
                        cols={3}
                        onChange={(e) => setReview({ ...review, TDD_rating: e.target.value })}
                        name="TDD_rating"
                        maxLength="3"
                        value={review.TDD_rating}
                    />
                    <label>/100</label>
                    <br />
                    <textarea
                        class="text_area_review"
                        rows={5}
                        cols={200}
                        onChange={(e) => setReview({ ...review, TDD_description: e.target.value })}
                        name="TDD_description"
                        value={review.TDD_description}
                    />
                </div>

                <div id='Agile_description'>
                    <h2 class="review_head"> Agile Description</h2>
                    <label class="review_label" fontSize="110%">
                        Set Proficiency score:
                         </label>
                    <textarea
                        class="text_area_score"
                        rows={1}
                        cols={3}
                        onChange={(e) => setReview({ ...review, Agile_rating: e.target.value })}
                        name="Agile_rating"
                        maxLength="3"
                        value={review.Agile_rating}
                    />
                    <label class="review_label" fontSize="110%">/100</label>
                    <br />
                    <textarea
                        class="text_area_review"
                        rows={5}
                        cols={200}
                        onChange={(e) => setReview({ ...review, Agile_description: e.target.value })}
                        name="Agile_description"
                        value={review.Agile_description}
                    />
                </div>

                <div id='Fluency_description'>
                    <h2 class="review_head"> Fluency Description</h2>
                    <label class="review_label" fontSize="110%">
                        Set Proficiency score:
                         </label>
                    <textarea
                        class="text_area_score"
                        rows={1}
                        cols={3}
                        onChange={(e) => setReview({ ...review, Fluency_rating: e.target.value })}
                        name="Fluency_rating"
                        maxLength="3"
                        value={review.Fluency_rating}
                    />
                    <label class="review_label" fontSize="110%">/100</label>
                    <br />
                    <textarea
                        class="text_area_review"
                        rows={5}
                        cols={200}
                        onChange={(e) => setReview({ ...review, Fluency_description: e.target.value })}
                        name="Fluency_description"
                        value={review.Fluency_description}
                    />
                </div>

                <div id='Debug_description'>
                    <h2 class="review_head"> Debug Description</h2>
                    <label class="review_label" fontSize="110%">
                        Set Proficiency score:
                         </label>
                    <textarea
                        class="text_area_score"
                        rows={1}
                        cols={3}
                        onChange={(e) => setReview({ ...review, Debug_rating: e.target.value })}
                        name="Debug_rating"
                        maxLength="3"
                        value={review.Debug_rating}
                    />
                    <label class="review_label" fontSize="110%">/100</label>
                    <br />
                    <textarea
                        class="text_area_review"
                        rows={5}
                        cols={200}
                        onChange={(e) => setReview({ ...review, Debug_description: e.target.value })}
                        name="Debug_description"
                        value={review.Debug_description}
                    />
                </div>

                <div id='Model_description'>
                    <h2 class="review_head"> Model Description</h2>
                    <label class="review_label" fontSize="110%">
                        Set Proficiency score:
                         </label>
                    <textarea
                        class="text_area_score"
                        rows={1}
                        cols={3}
                        onChange={(e) => setReview({ ...review, Model_rating: e.target.value })}
                        name="Model_rating"
                        maxLength="3"
                        value={review.Model_rating}
                    />
                    <label class="review_label" fontSize="110%">/100</label>
                    <br />
                    <textarea
                        class="text_area_review"
                        rows={5}
                        cols={200}
                        onChange={(e) => setReview({ ...review, Model_description: e.target.value })}
                        name="Model_description"
                        value={review.Model_description}
                    />
                </div>

                <div id='Refactor_description'>
                    <h2 class="review_head"> Refactor Description</h2>
                    <label class="review_label" fontSize="110%">
                        Set Proficiency score:
                         </label>
                    <textarea
                        class="text_area_score"
                        rows={1}
                        cols={3}
                        onChange={(e) => setReview({ ...review, Refactor_rating: e.target.value })}
                        name="Refactor_rating"
                        maxLength="3"
                        value={review.Refactor_rating}
                    />
                    <label class="review_label" fontSize="110%">/100</label>
                    <br />
                    <textarea
                        class="text_area_review"
                        rows={5}
                        cols={200}
                        onChange={(e) => setReview({ ...review, Refactor_description: e.target.value })}
                        name="Refactor_description"
                        value={review.Refactor_description}
                    />
                </div>

                <div id='Maintainability_description'>
                    <h2 class="review_head"> Maintainability Description</h2>
                    <label class="review_label" fontSize="110%">
                        Set Proficiency score:
                         </label>
                    <textarea
                        class="text_area_score"
                        rows={1}
                        cols={3}
                        onChange={(e) => setReview({ ...review, Maintainability_rating: e.target.value })}
                        name="Maintainability_rating"
                        maxLength="3"
                        value={review.Maintainability_rating}
                    />
                    <label class="review_label" fontSize="110%">/100</label>
                    <br />
                    <textarea
                        class="text_area_review"
                        rows={5}
                        cols={200}
                        onChange={(e) => setReview({ ...review, Maintainability_description: e.target.value })}
                        name="Maintainability_description"
                        value={review.Maintainability_description}
                    />
                </div>


            </div>
        )
    }

}

export default Review;
