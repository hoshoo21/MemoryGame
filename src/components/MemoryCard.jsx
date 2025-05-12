import { decodeEntity } from "html-entities"
import EmojiButton from "./EmojiButton";
export default function MemoryCard({ handleClick, data, selectedCards, matchedCards }) {
  
    
    const emojiEl =  data.map((emoji, index) =>{
        const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)
        const matchedCardEntry = matchedCards.find(emoji => emoji.index === index)
        const cardStyle = selectedCardEntry?"card-item--selected":
                         matchedCardEntry? "card-item--matched":
                        ""
        return (
            <li key={index} className={`card-item ${cardStyle}`}>
            <EmojiButton
                content={decodeEntity(emoji.htmlCode[0])}
                handleClick={() => handleClick(emoji.name, index)}
                selectedCardEntry={selectedCardEntry}
                matchedCardEntry={matchedCardEntry}
            />
        </li>
       );
    });
    return <ul className="card-container">{emojiEl}</ul>
}