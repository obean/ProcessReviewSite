import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const RatingsList = () => {
  useEffect(() => {
    fetchRatings();
  }, []);

  const [ratings, setRatings] = useState([]);

  const fetchRatings = async (res) => {
    const data = await fetch('http://localhost:9000/reviews/ratings');
    const ratings = await data.json();
    // console.log(ratings)
    setRatings(ratings)
  };

  const formatter = () => {

    for (let index = 0; index < ratings.length; index++) {
      ratings[index]['name'] = index + 1
      
    }
    console.log(ratings)
  }
  formatter()
// const data = [
//   {
//     name: '1', uv: 4000, pv: 2400, amt: 2400,
//   },
// ];

  return (
    <LineChart
      width={700}
      height={500}
      data={ratings}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="TDD_rating" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Fluency_rating" stroke="#82ca8d" />
      <Line type="monotone" dataKey="Debug_rating" stroke="#82ca5d" />
      <Line type="monotone" dataKey="Model_rating" stroke="#82ca3d" />
      <Line type="monotone" dataKey="Refactor_rating" stroke="#82ca2d" />
      <Line type="monotone" dataKey="Agile_rating" stroke="#82ca1d" />
      <Line type="monotone" dataKey="Maintainability_rating" stroke="#82ca6d" />
    </LineChart>
  );


}
    

export default RatingsList;
