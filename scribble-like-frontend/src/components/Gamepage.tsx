import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function Gamepage() {
  const location = useLocation();
  const socket = location.state;
  const [playername, setPlayername] = useState("")
  useEffect(()=>{

    if (!socket) {
      return;
  }
  socket.onmessage = (event:any) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
          case "INIT_GAME":
              setPlayername(message.payload.player)
              break;
      }
  }
  },[socket])
  if(!socket) return <h1>connecting to the server</h1>
  return (
    <div className='gird grid-cols-2'>
      <div className='col-span-1 border border-gray-400'>
        <h1>you are player {playername}</h1>

      </div>
      <div></div>
    </div>
  )
}

export default Gamepage