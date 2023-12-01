import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./CSS/App.css"
import Homepage from './Components/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='wrapper'>
     <Homepage />
     </div>
    </>
  )
}

export default App
