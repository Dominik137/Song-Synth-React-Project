import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./CSS/App.css"
import Header from './Components/Header'
import Homepage from './Components/Homepage'
import About from './Components/About'
import MyStats from './Components/MyStats'

function App() {
 
 return (
    <>
    <div className='bg-gradient-to-b from-gray-300 to-transparent p-10 p-full grid gap-3 grid-cols-3 grid-rows-2 '>
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
