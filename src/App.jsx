import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./CSS/App.css"
import Header from './Components/Header'
import Homepage from './Components/Homepage'
import About from './Components/About'
import MyStats from './Components/MyStats'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
    <div className='wrapper'>
     <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/about' element={<About />} />
        <Route path='/my-stats' element={<MyStats />} />
      </Routes>
     </BrowserRouter>
     </div>
    </>
  )
}

export default App
