import { useState } from 'react'
import './App.css'
import MemoryCard from './components/MemoryCard';

function App() {
  const [isGameOn, setIsGameOn]= useState(false);

  const startGame =(e)=>{
    e.preventDefault();
    setIsGameOn(true)
  }

  const turnCard=()=>{
    console.log('function hanlder');
  }
  return (
    <main>
        <h1> Memory Game</h1>

        {!isGameOn && <Form handleSubmit={startGame} />}
        {isGameOn && <MemoryCard handleClick={turnCard} />}
    </main>
       
    
  )
}

export default App
