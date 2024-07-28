import React, { useState } from 'react'

function Messagebox({messages, socket}:any) {
  const [wordsending, setWordsending] = useState("");
  const clickHandler = () =>{
    if(socket){
      socket.send(JSON.stringify({
        type: "GUESS",
        payload: {
          guess: wordsending
        }
    }))
    }
  }
    return (
    <div>
      {messages.map((message:any)=>{
        console.log(message);
        
        <div className='flex justify-end'>
          <h1>{message.player}</h1>
          <p>{message.guessWord}</p>
        </div>
      })}
      <input type="text" onChange={(e)=>{setWordsending(e.target.value)}}/>
      <button onClick={clickHandler}>Guess</button>
    </div>
  )
}

export default Messagebox