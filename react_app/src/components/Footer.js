import { useEffect, useState } from "react";

import LetterCard from "./LetterCard";

const Footer = (props) => {
    const word1 = ["b", "y"];
    const pattern1 = ["-", "x"];
    const word2 = ["j", "o", "r", "g", "e", "l", "g", "3"];
    const pattern2 = ["x", "o", "-", "o", "-", "x", "-", "-"];
    // const [flip, setFlip] = useState(false);

    // useEffect(() => {
    //     setFlip(true);
    // }, []);

    return (
        <div className="footer">
            <div className="word-footer">
                {word1.map((letter, idx) => <LetterCard letter={letter} pattern={pattern1[idx]} flip={props.triggerFlip}/>)}
            </div>
            <div className="word-footer">
                {word2.map((letter, idx) => <LetterCard letter={letter} pattern={pattern2[idx]} flip={props.triggerFlip}/>)}
            </div>
            
        </div>
    )
}

export default Footer;