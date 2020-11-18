import React, { useState, useEffect } from 'react';
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

function RadarChartRecharts() {
      useEffect(() => {
        fetchRatings();
      }, []);
    
      const renderColorfulLegendText = (value, entry) => {
        const { color } = entry;
        return <span style={{ color }}>{value}</span>;
      };
    
      const [ratings, setRatings] = useState([]);
      const [user, setUser] = useState([])

      const fetchRatings = async (res) => {
        const data = await fetch('http://localhost:9000/users/logged-in');
        const user = await data.json();
        setUser(user)
        const data1 = await fetch(`http://localhost:9000/reviews/ratings?id=${user.id}`);
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
      <RadarChart cx={350} cy={200} outerRadius={170} width={700} height={500} data={ratings}
      margin={{
          bottom: 50,
        }}>
        <PolarGrid gridType='circle' stroke="#07BEB8"/>
        <PolarAngleAxis dataKey="subject" stroke="#cae9ff"/>
        <PolarRadiusAxis angle={20} domain={[0, 100]} stroke="#9CEAEF"/>
        <Radar name="Latest Review" dataKey="score" stroke="#3DCCC7" fill="#00ABFF" fillOpacity={0.65} />
        <Legend formatter={renderColorfulLegendText} />
      </RadarChart>
    );
  }

  export default RadarChartRecharts;