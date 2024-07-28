import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const clickHandler = ()=>{
    navigate('/gamepage');
  }
  return (
    <div className=''>
      <h1>Click the button below to connect to the server</h1>
      <button onClick={clickHandler}>Go to game page</button>
    </div>
  )
}

export default Home