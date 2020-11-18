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
      <RadarChart cx={350} cy={200} outerRadius={150} width={700} height={500} data={ratings}
      margin={{
          bottom: 50,
        }}>
        <PolarGrid gridType='circle'/>
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={20} domain={[0, 100]} />
        <Radar name="Latest Review" dataKey="score" stroke="#FF6600" fill="#00ABFF" fillOpacity={0.65} />
        <Legend />
      </RadarChart>
    );
  }

  export default RadarChartRecharts;