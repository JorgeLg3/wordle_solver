const ListContainer = (props) => {

    return (
        <div className="list-container">
            {props.wordList.map((word) => 
                <div className='word-opt' 
                    //onClick={(e) => props.setOption(e.currentTarget.textContent)}
                >
                    {word.toUpperCase()}
                </div>)}
        </div>
    )
}

export default ListContainer