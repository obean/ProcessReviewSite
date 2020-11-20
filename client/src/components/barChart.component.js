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
    const data = await fetch('/users/logged-in');
    const user = await data.json();
    setUser(user)
    const data1 = await fetch(`reviews/ratings?id=${user.id}`);
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

    // [{"id":52,"TDD_rating":80,"Fluency_rating":70,"Debug_rating":64,"Model_rating":53,"Refactor_rating":68,"Agile_rating":91,"Maintainability_rating":98},{"id":48,"TDD_rating":null,"Fluency_rating":null,"Debug_rating":null,"Model_rating":null,"Refactor_rating":null,"Agile_rating":null,"Maintainability_rating":null},{"id":50,"TDD_rating":70,"Fluency_rating":45,"Debug_rating":60,"Model_rating":64,"Refactor_rating":65,"Agile_rating":64,"Maintainability_rating":67},{"id":49,"TDD_rating":50,"Fluency_rating":20,"Debug_rating":56,"Model_rating":70,"Refactor_rating":70,"Agile_rating":40,"Maintainability_rating":60},{"id":51,"TDD_rating":67,"Fluency_rating":66,"Debug_rating":62,"Model_rating":43,"Refactor_rating":67,"Agile_rating":70,"Maintainability_rating":78},{"id":53,"TDD_rating":null,"Fluency_rating":null,"Debug_rating":null,"Model_rating":null,"Refactor_rating":null,"Agile_rating":null,"Maintainability_rating":null}]
    
    return (
      <BarChart
        width={800}
        height={600}
        data={ratings.sort((a,b) => a.id - b.id)}
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
