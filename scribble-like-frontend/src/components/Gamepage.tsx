import React, { useEffect, useState } from 'react'
import Messagebox from './Messagebox';
import Sender from './Sender';
import Reciever from './Reciever';

function Gamepage({socket}:any) {
  const [playername, setPlayername] = useState("");
  const [messages, setMessages] = useState([{}]);
  const [guessing, setGuessing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [word, setWord] = useState("");
  const [started, setStarted] = useState(false);
  const [currentPoint, setCurrentPoint] = useState(null)
  const [prevPoint, setPrevPoint] = useState(null)
  const [color, setColor] = useState("#000000")
  useEffect(()=>{
    if (!socket) {
      return;
  }
  // console.log("reched 1");
  
  socket.onmessage = (event:any) => {
    // console.log("reched");
    
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
            // console.log(message.payload.guessed);
            setMessages(message.payload.guessed);
            break;
          case "GUESSED":
            alert(message.payload.message);
            break;
          case "DRAWING_LINES":
            
            setCurrentPoint(message.payload.currentPoint);
            
            setPrevPoint(message.payload.prevPoint);
            
            setColor(message.payload.color)
            
            break;
      }
  }
  },[socket])


  function showAlert(type:string, title:string, message:string) {
    const alert = document.getElementById('alert');
    const alertIcon = document.getElementById('alert-icon');
    const alertTitle = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');
    if(!alert) return
    if(!alertIcon) return
    if(!alertTitle) return
    if(!alertMessage) return
    alert.classList.remove('hidden');
    
    switch(type) {
        case 'success':
            alert.classList.add('bg-green-100', 'border-green-500');
            alertIcon.innerHTML = `<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2l4 -4"></path></svg>`;
            break;
        case 'error':
            alert.classList.add('bg-red-100', 'border-red-500');
            alertIcon.innerHTML = `<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
            break;
        case 'warning':
            alert.classList.add('bg-yellow-100', 'border-yellow-500');
            alertIcon.innerHTML = `<svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.29 3.86l1.42-.84A8.018 8.018 0 0 1 21 12h-1m-.93 3.36A7.999 7.999 0 0 1 13 20.83v-1.88m-.83-3.83a3.5 3.5 0 1 0 4.96-4.96M16 9v.01M12 17h.01M5.29 3.86L6.71 4.7A8.018 8.018 0 0 0 3 12h1m.93 3.36A7.999 7.999 0 0 0 11 20.83v-1.88m.83-3.83a3.5 3.5 0 1 1-4.96-4.96M8 9v.01M12 5h.01"></path></svg>`;
            break;
        case 'info':
            alert.classList.add('bg-blue-100', 'border-blue-500');
            alertIcon.innerHTML = `<svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m0-4h.01M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14z"></path></svg>`;
            break;
        default:
            alert.classList.add('bg-gray-100', 'border-gray-500');
            alertIcon.innerHTML = `<svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 6a9 9 0 1 1 0 18a9 9 0 0 1 0-18z"></path></svg>`;
      }

    alertTitle.innerText = title;
    alertMessage.innerText = message;

    setTimeout(() => {
        alert.classList.add('hidden');
        alert.classList.remove('bg-green-100', 'bg-red-100', 'bg-yellow-100', 'bg-blue-100', 'bg-gray-100', 'border-green-500', 'border-red-500', 'border-yellow-500', 'border-blue-500', 'border-gray-500');
    }, 3000);
  }

  if(!started) return <div>
    <h1>connecting to the server...</h1>
    </div>
  return (
    <div className='gird grid-cols-2'>
      <div className='col-span-1 border border-gray-400'>
        <h1>you are player {playername}</h1>
        {guessing? <h2>you are guessing</h2>: <h2>you are drawing the word:{word}</h2>}
        <h3>Timer:{timer}</h3>
      </div>
      <div className='flex'>
        <div>
          {guessing ? <Reciever currentPoint={currentPoint} prevPoint={prevPoint} color={color}/> : <Sender socket={socket} />}
        </div>
        <div>
          <Messagebox messages={messages} socket={socket}/>
        </div>
      </div>
    </div>
  )
}

export default Gamepage