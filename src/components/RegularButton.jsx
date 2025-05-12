export default function RegularButton({ children, handleClick ,selectedCardEntry , matchedCardEntry}) {
    /**
     * Challenge:
     * 3) Create a new variable, "btnStyle", and conditionally assign it one of the following values:
     *      a) Selected card: "btn--emoji__back--selected".
     *      b) Matched card: "btn--emoji__back--matched".
     *      c) Neither: "btn--emoji__front".
     * 4) Add "btnStyle" to the existing classes set on the button.
     * 
     * 💡 Hint for step 1 & 3:
     * Think carefully about the order in which you check if a card is selected, matched or neither.
     * 
     * When you're done, there should be hover/focus effects (box-shadow and background-color) on cards lying face-down, animation when cards are turned, and greyed out background on matched cards.
     */
    return (
        <button
            className={`btn btn--text`}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}