import React from 'react'
import { useSocket } from '../hooks/useSocket'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const socket = useSocket();
  const clickHandler = ()=>{
    if(socket){
      socket.send(JSON.stringify({
        type: "INIT_GAME"
    }))
    }
    navigate('/gamepage', { state: socket });
  }
  return (
    <div className=''>
      <h1>Click the button below to connect to the server</h1>
      <button onClick={clickHandler}>Connect</button>
    </div>
  )
}

export default Home