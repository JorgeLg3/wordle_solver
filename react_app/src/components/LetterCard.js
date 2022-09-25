

const LetterCard = (props) => {

    let patternClass = props.pattern === 'o' ? 'yellow-card' : (props.pattern === 'x' ? 'green-card' : (props.pattern === '-' ? 'grey-card' : ('')))

    return (
        <div className={`letter-card ${patternClass}`}>
            {props.letter.toUpperCase()}
        </div>
    )
}

export default LetterCard