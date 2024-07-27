import React from 'react'

function Home() {
  const clickHandler = ()=>{
    
  }
  return (
    <div className=''>
      <h1>Click the button below to connect to the server</h1>
      <button onClick={clickHandler}>Connect</button>
    </div>
  )
}

export default Home