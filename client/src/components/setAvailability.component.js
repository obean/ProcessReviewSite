
// import React, { Component, useState, useEffect } from "react";
// import MultipleDatePicker from 'react-multiple-datepicker'
//  function datePicker(){
// return (
//   <MultipleDatePicker
//     onSubmit={dates => console.log(`${dates[0].getDate()}/${dates[0].getMonth() + 1}/${dates[0].getFullYear()}`)}
//   />)
// }

// export default datePicker;

import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import DateTimePicker from 'react-datetime-picker';



function DatePicker() {
  useEffect(() => {
    setDate()
  },[])
  useEffect(() => {
    fetchUser()
  },[])
  const [value, setValue] = useState([])
  const [user, setUser] = useState([])

  
  const onChange = (newDate) => {
    setValue([...value, newDate ])  
    console.log(value)
  }
    // console.log(`${value.getDate()}/${value.getMonth()}/${value.getFullYear()}`)}

  const setDate =() => {
    setValue([new Date])
  }
  //`${x.getDate()}/${x.getMonth()}/${x.getFullYear()}`

  const fetchUser = async (res) => {
    try {
      const data = await fetch('http://localhost:9000/users/logged-in').catch((err) => console.log(err));
      const user = await data.json();
      
        setUser(user)
      
    }catch (e) {console.log(e)}  
  }  
     
  const handleSubmit = () => {
    let dateNames = []
    for(let i = 1; i <= value.length -1; i++){
      dateNames.push(`${value[i].getDate()}/${value[i].getMonth() + 1}/${value[i].getFullYear()}`)
    }
    fetch('http://localhost9000/reviews/create', {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      }, 
      body: JSON.stringify({dateNames, id: user.id})
    })
    
  }
    return (
      <div className="Sample">
        <header>
          
        </header>
        <div className="Sample__container">
          <main className="Sample__container__content">
            <DateTimePicker
              amPmAriaLabel="Select AM/PM"
              calendarAriaLabel="Toggle calendar"
              clearAriaLabel="Clear value"
              dayAriaLabel="Day"
              hourAriaLabel="Hour"
              maxDetail="second"
              minuteAriaLabel="Minute"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date and time"
              onChange={onChange}
              secondAriaLabel="Second"
              value={value[value.length-1]}
              yearAriaLabel="Year"
            />
            {value.map((x) => value.indexOf(x) >= 1 ?<h1> {`${x.getDate()}/${x.getMonth() +1}/${x.getFullYear()}`} </h1> : <h1></h1>)}

            <button onClick={()=> handleSubmit()}>Create Review Slots</button>
          </main>

        </div>
      </div>
    );
  
}

export default DatePicker;