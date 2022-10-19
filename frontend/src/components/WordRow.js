import {useState, useEffect} from "react";

import LetterCard from "./LetterCard";

const WordRow = ({word, pattern}) => {
    const [letters, setLetters] = useState(['', '', '', '', '']);
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        setLetters(word.split(""));
        if (pattern !== '     '){
            setFlip(true);
        }
        
    }, [word])

    return (
        <div className='row-container'>
            {letters.map((letter, idx) => <LetterCard letter={letter} pattern={pattern[idx]} flip={flip}/>)}
        </div>
    )
}

export default WordRow