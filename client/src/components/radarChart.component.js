import React, { useState, useEffect } from 'react';
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

function RadarChartRecharts() {
      useEffect(() => {
        fetchRatings();
      }, []);
    
    
      const [ratings, setRatings] = useState([]);
    
      const fetchRatings = async (res) => {
        const data = await fetch('http://localhost:9000/reviews/ratings');
        const ratings = await data.json();
        console.log(ratings)
        const latestRatings = Object.entries(ratings.slice(-1)[0]).map(([x, y]) => ({ subject: x.replace('_rating', ''), score: y }));
        console.log(latestRatings);
        setRatings(latestRatings)
      };

      
    return (
      <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={ratings}>
        <PolarGrid gridType='circle'/>
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Mike" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    );
  }

  export default RadarChartRecharts;