

const LetterCard = (props) => {

    let patternClass = props.pattern === 'o' ? 'yellow-card' : (props.pattern === 'x' ? 'green-card' : (props.pattern === '-' ? 'grey-card' : ('')))
    let isflipped = props.flip === true ? 'is-flipped' : '';

    return (
        // <div className={`letter-card ${patternClass}`}>
        //     {props.letter.toUpperCase()}
        // </div>
        <div className="card">
            <div className={`card-inner ${isflipped}`}>
                <div className="card-face card-front">

                </div>
                <div className={`card-face card-back ${patternClass}`}>
                    <div className="card-content">
                        {props.letter}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LetterCard