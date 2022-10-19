import { useEffect, useState } from "react";

import LetterCard from "./LetterCard";

const Header = () => {
    const title = ["w", "o", "r", "d", "l", "e"];
    const subtitle = ["s", "o", "l", "v", "e", "r"];
    const pattern = ["-", "o", "-", "x", "o", "-"];
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        setFlip(true);
    }, []);

    return (
        <div className="header">
            <div className="title">
                {title.map((letter) => <div className="title-card green-card">{letter}</div>)}
            </div>
            <div className="subtitle">
                {subtitle.map((letter, idx) => <LetterCard letter={letter} pattern={pattern[idx]} flip={flip}/>)}
            </div>
            
        </div>
    )
}

export default Header;