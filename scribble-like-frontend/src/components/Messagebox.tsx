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
  console.log(messages);
  
    return (
    <div>
      {messages.map((message:any)=>(
        // console.log(message);
        <div className='flex justify-end'>
          <p>{message.guessWord} - </p>

          <h1>- {message.player}</h1>
        </div>
      ))}
      <input type="text" onChange={(e)=>{setWordsending(e.target.value)}}/>
      <button onClick={clickHandler}>Guess</button>
    </div>
  )
}

export default Messagebox