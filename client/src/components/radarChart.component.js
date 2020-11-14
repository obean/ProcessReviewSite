import React, { useState, useEffect } from 'react';
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const data = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150, },
  { subject: 'Chinese', A: 98, B: 130, fullMark: 150,},
  { subject: 'English', A: 86, B: 130, fullMark: 150,},
  { subject: 'Geography', A: 99, B: 100, fullMark: 150,},
  { subject: 'Physics', A: 85, B: 90, fullMark: 150, },
  { subject: 'History', A: 65, B: 85, fullMark: 150,},
];

function RadarChartRecharts() {
    useEffect(() => {
        fetchScores();
      }, []);
    
      const [scores, setScores] = useState([]);
    
      const fetchScores = async (res) => {
        const data = await fetch('http://localhost:9000/reviews/all');
        const scores = await data.json();
        console.log(scores[0].TDD_rating)
        let userScores = []
        
        setScores(scores)
      };

    
    return (
      <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data}>
        <PolarGrid gridType='circle'/>
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    );
  }

  export default RadarChartRecharts;