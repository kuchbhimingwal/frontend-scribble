
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Layout from './Layout'
import Gamepage from './components/Gamepage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="gamepage" element={<Gamepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
