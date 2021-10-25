import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad})=> {
  if(good===0 && neutral ===0 && bad===0) {
    return (<p>No feedback given</p>)
  } else {
    const total = good+neutral+bad
    return (
      <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {(good-bad)/total}</p>
        <p>positive {(good/total)*100 + '%'}</p>
      </>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood = ()=>setGood(good+1)
  const handleNeutral = ()=>setNeutral(neutral+1)
  const handleBad = ()=>setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App