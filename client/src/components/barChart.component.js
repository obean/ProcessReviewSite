import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const BarChartRechart = () => {
 
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
      <BarChart
        width={500}
        height={300}
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
        <Bar dataKey="TDD" fill="#8884d8" />
        <Bar dataKey="Fluency" fill="#82ca9d" />
        <Bar dataKey="Debug" fill="#FFF80B" />
        <Bar dataKey="Model" fill="#54FF15" />
        <Bar dataKey="Refactor" fill="#B60FF3" />
        <Bar dataKey="Agile" fill="#FFC115" />
        <Bar dataKey="Maintainability" fill="#F30FE4" />
      </BarChart>
    );
  
  
  }
      
  
  export default BarChartRechart;
