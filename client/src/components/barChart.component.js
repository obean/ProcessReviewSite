import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const BarChartRechart = () => {
  
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
      <BarChart
        width={800}
        height={600}
        data={ratings}
        margin={{
          top: 10, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="white" />
        <YAxis stroke="white"/>
        <Tooltip />
        <Legend formatter={renderColorfulLegendText} />
        <Bar dataKey="TDD" fill="#ffadad" opacity="0.8" />
        <Bar dataKey="Fluency" fill="#ffd6a5" opacity="0.8"/>
        <Bar dataKey="Debug" fill="#fdffb6" opacity="0.8" />
        <Bar dataKey="Model" fill="#caffbf" opacity="0.8" />
        <Bar dataKey="Refactor" fill="#9bf6ff" opacity="0.8" />
        <Bar dataKey="Agile" fill="#a0c4ff" opacity="0.8" />
        <Bar dataKey="Maintainability" fill="#bdb2ff" opacity="0.8" />
      </BarChart>
    );
  
  
  }
      
  
  export default BarChartRechart;
