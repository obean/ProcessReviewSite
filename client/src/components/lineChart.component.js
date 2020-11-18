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
    setRatings(ratings)
  };

  const formatter = () => {
    for (let index = 0; index < ratings.length; index++) {
      ratings[index]['name'] = index + 1;

      for (const [old_key] of Object.entries(ratings[index])) {
        if (old_key.endsWith("_rating")) {
          let new_key = old_key.slice(0, -7);
          ratings[index][new_key] = ratings[index][old_key];
          delete ratings[index][old_key];
        }
      }
    }
  }

  formatter()
  console.log(ratings)
  
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
      <Line type="monotone" dataKey="TDD" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Fluency" stroke="#82ca8d" />
      <Line type="monotone" dataKey="Debug" stroke="#23ca5d" />
      <Line type="monotone" dataKey="Model" stroke="#56ca3d" />
      <Line type="monotone" dataKey="Refactor" stroke="#76ca2d" />
      <Line type="monotone" dataKey="Agile" stroke="#45ca1d" />
      <Line type="monotone" dataKey="Maintainability" stroke="#45ca6d" />
    </LineChart>
  );


}
    

export default RatingsList;
