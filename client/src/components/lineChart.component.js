import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const RatingsList = () => {
 
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }}>{value}</span>;
  };

  useEffect(() => {
    fetchRatings();
  }, []);


  const [ratings, setRatings] = useState([]);
  const [user, setUser] = useState([])

  const fetchRatings = async (res) => {
    const data = await fetch('http://localhost:9000/users/logged-in');
    const user = await data.json();
    setUser(user)
    const data1 = await fetch(`http://localhost:9000/reviews/ratings?id=${user.id}`);
    const ratings = await data1.json();
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
      width={800}
      height={600}
      data={ratings}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="white" />
      <YAxis stroke="white" />
      <Tooltip />
      <Legend formatter={renderColorfulLegendText}/>
      <Line type="monotone" dataKey="TDD" stroke="#d00000" activeDot={{ r: 8 }} opacity="1" />
      <Line type="monotone" dataKey="Fluency" stroke="#ffba08" opacity="1" />
      <Line type="monotone" dataKey="Debug" stroke="#cbff8c" opacity="1"/>
      <Line type="monotone" dataKey="Model" stroke="#8fe388" opacity="1" />
      <Line type="monotone" dataKey="Refactor" stroke="#1b998b" opacity="1" />
      <Line type="monotone" dataKey="Agile" stroke="#5d2e8c" opacity="1" />
      <Line type="monotone" dataKey="Maintainability" stroke="#ff7b9c" opacity="1" />
    </LineChart>
  );


}
    

export default RatingsList;
