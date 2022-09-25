import { useEffect, useState } from "react";

import LetterCard from "./LetterCard";

const Footer = () => {
    const word1 = ["b", "y"];
    const pattern1 = ["-", "x"];
    const word2 = ["j", "o", "r", "g", "e", "l", "g", "3"];
    const pattern2 = ["x", "o", "-", "o", "-", "x", "o", "-"];
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        setFlip(true);
    }, []);

    return (
        <div className="Header">
            <div className="title">
                {title.map((letter) => <div className="title-card green-card">{letter}</div>)}
            </div>
            <div className="subtitle">
                {subtitle.map((letter, idx) => <LetterCard letter={letter} pattern={pattern[idx]} flip={flip}/>)}
            </div>
            
        </div>
    )
}

export default Footer;