import React, { useState, useEffect } from 'react'

export default function Clock(props) {

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000)

    return function cleanUp() {
      clearInterval(timerId)
    }
  })

  function tick() {
    setTime(new Date())
  }
  
  return(
    <div>
      <h1>Clock here: {props.name}</h1>
      <p>Now: {time.toLocaleString()}</p>
    </div>
  )
}

