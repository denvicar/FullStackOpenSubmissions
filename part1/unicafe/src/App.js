import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({name,count})=> {
  return (
    <p>{name} {count}</p>
  )
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
      <Statistic name="good" count={good} />
      <Statistic name="neutral" count={neutral} />
      <Statistic name="bad" count={bad} />
      <Statistic name="all" count={good+neutral+bad} />
      <Statistic name="average" count={(good-bad)/(good+neutral+bad)} />
      <Statistic name="positive" count={((good)/(good+neutral+bad))*100 + '%'} />
    </div>
  )
}

export default App