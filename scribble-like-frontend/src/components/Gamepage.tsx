import React, { useEffect, useState } from 'react'
import Messagebox from './Messagebox';
import { useSocket } from '../hooks/useSocket';

function Gamepage() {
  const socket = useSocket();
  const [playername, setPlayername] = useState("");
  const [messages, setMessages] = useState([{}]);
  const [guessing, setGuessing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [word, setWord] = useState("");
  const [started, setStarted] = useState(false)
  useEffect(()=>{
    if (!socket) {
      return;
  }
  socket.onmessage = (event:any) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
          case "INIT_GAME":
              setPlayername(message.payload.player);
              setStarted(true)
              break;
          case "GUESSING_PLAYERS":
            setGuessing(true);
            setWord("");
            break;
          case "DRAWING":
            setGuessing(false);
            setWord(message.payload.word);
            break;
          case "TIMER":
            setTimer(message.payload.time);
            break;
          case "GUESS":
            console.log(message.payload.guessed);
            break;
          case "GUESSED":
            alert(message.payload.message);

      }
  }
  },[socket])
  if(!socket) return <div>
    <h1>connecting to the server...</h1>
    </div>
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
    <div className="pt-8">
                        {!started && <button onClick={() => {
                            socket.send(JSON.stringify({
                                type: "INIT_GAME"
                            }))
                        }} >
                            Play
                        </button>}
                    </div>
    </div>
  )
}

export default Gamepage