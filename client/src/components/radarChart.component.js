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
      const [user, setUser] = useState([])

      const fetchRatings = async (res) => {
        const data = await fetch('/api/users/logged-in');
        const user = await data.json();
        setUser(user)
        const data1 = await fetch(`/api/reviews/ratings?id=${user.id}`);
        let ratings = await data1.json();
        if (ratings.length < 1){
           ratings = null
        } else {
        const latestRatings = Object.entries(ratings.slice(-1)[0]).map(([x, y]) => ({ subject: x.replace('_rating', ''), score: y }));
        console.log(latestRatings);
        setRatings(latestRatings)
        }
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