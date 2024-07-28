import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Messagebox from './messagebox';

function Gamepage() {
  const location = useLocation();
  const socket = location.state;
  const [playername, setPlayername] = useState("");
  const [messages, setMessages] = useState([{}]);
  const [guessing, setGuessing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [word, setWord] = useState("")
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
          case "GUESSING_PLAYERS":
            setGuessing(true);
            setWord("")
            break;
          case "DRAWING":
            setGuessing(false);
            setWord(message.payload.word);
            break;
          case "TIMER":
            setTimer(message.payload.time);
            break;
          case "GUESS":
            setMessages((prevArray) => [...prevArray, message.payload]);
            break;
      }
  }
  },[socket])
  if(!socket) return <h1>connecting to the server</h1>
  return (
    <div className='gird grid-cols-2'>
      <div className='col-span-1 border border-gray-400'>
        <h1>you are player {playername}</h1>
        {guessing? <h2>you are guessing</h2>: <h2>you are drawing the word:{word}</h2>}
        <h3>Timer:{timer}</h3>
      </div>
      <div>
        <Messagebox messages={messages} socket={socket}/>
      </div>
    </div>
  )
}

export default Gamepage