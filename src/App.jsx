import { useEffect, useState } from 'react'
import './App.css'
import MemoryCard from './components/MemoryCard';
import Form from './components/Form';
import GameOver from './components/GameOver';


const getRandomIntInclusive =(min, max)=> {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
const getRandomNumbers = (count, min, max) => {
  const numbers = new Set();
  while (numbers.size < count) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(num);
  }
  return Array.from(numbers);
};

function App() {
  const [isGameOn, setIsGameOn]= useState(false);
  const [emojisData, setEmoiisData]= useState([]);
  const [selectedCards, setSelectedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)
   
  useEffect(()=>{
    console.log(emojisData);
  },[emojisData]);
  useEffect(() => {
    if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
        setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
    }
  }, [selectedCards])

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setAreAllCardsMatched(true)
    }
  }, [matchedCards])
  const startGame =async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature"); 
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();

      console.log(data);
      const indexarr = getRandomNumbers(5,1,data.length);
      console.log(indexarr);
      const numberOfDuplicates = 5;
      const shuffled = [...indexarr].sort(() => 0.5 - Math.random());
      const uniqueDuplicates = shuffled.slice(0, numberOfDuplicates); 
      const result = [...indexarr, ...uniqueDuplicates];
      const dataSample  =result.map(index=> data[index]);
      setEmoiisData(dataSample);
      setIsGameOn(true);
    } 

  
    catch(error) {
      console.log(error);
    }
  }

  const resetGame=()=>{
    setIsGameOn(false)
    setSelectedCards([])
    setMatchedCards([])
    setAreAllCardsMatched(false)
  }
  const turnCard=(name, index)=>{  
      const selectedCardEntry = selectedCards.find((emoji)=> emoji.index == index);
      if (!selectedCardEntry && selectedCards.length < 2){
        setSelectedCards(prevSelectedCardEntry => [...prevSelectedCardEntry, {index,name} ]);
      }
      else if (!selectedCardEntry && selectedCards.length ===2){
        setSelectedCards([{index,name}]);
      }

  }
  return (
    <main>
        <h1> Memory Game</h1>

        {!isGameOn && <Form handleSubmit={startGame} />}
        {areAllCardsMatched && <GameOver handleClick={resetGame} />}
          
        {isGameOn && <MemoryCard 
        handleClick={turnCard} 
        data={emojisData}
        selectedCards={selectedCards}
        matchedCards={matchedCards}
        />}
    </main>
       
    
  )
}

export default App
