import { useEffect, useState } from 'react'
import './App.css'
import MemoryCard from './components/MemoryCard';
import Form from './components/Form';

function App() {
  const [isGameOn, setIsGameOn]= useState(false);
  const [emojisData, setEmoiisData]= useState([]);

  useEffect(()=>{
    console.log(emojisData);
  },[emojisData]);
  const startGame =async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature"); 
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      const dataSample  = data.slice(0,5);
      setEmoiisData(dataSample);
    }

  
    catch(error) {
      console.log(error);
    }
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
