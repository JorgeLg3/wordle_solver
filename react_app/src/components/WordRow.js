import {useState, useEffect} from "react";

import LetterCard from "./LetterCard";

const WordRow = ({word, pattern}) => {
    const [letters, setLetters] = useState(['', '', '', '', '']);

    useEffect(() => {
        setLetters(word.split(""));
    }, [word])

    return (
        <div className='row-container'>
            {letters.map((letter, idx) => <LetterCard letter={letter} pattern={pattern[idx]}/>)}
        </div>
    )
}

export default WordRow