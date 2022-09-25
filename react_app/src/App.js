import {useState, useEffect} from "react";

import WordRow from "./components/WordRow";
import ListContainer from "./components/ListContainer";
import './static/styles.css'
import Header from "./components/Header";

function App() {
  const [wordleList, setWordleList] = useState([]);
  const [optList, setOptList] = useState([]);
  const [wordGoal, setWordGoal] = useState('');
  const [count, setCount] = useState(0);
  const [choices, setChoices] = useState(['     ', '     ', '     ', '     ', '     ', '     ']);
  const [patterns, setPatterns] = useState(['     ', '     ', '     ', '     ', '     ', '     ']);
  const [deactivate, setDeactivate] = useState(false);

  let remaining = optList.length;

  useEffect(() => {
    getInitialList();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!deactivate){
      getOptimalList();
    }
    
  }

  async function getInitialList(){
    try{
      let response = await fetch("http://127.0.0.1:8000/");
      let response_json = await response.json();
      setWordleList(response_json.list)
      setOptList(response_json.list)
    } catch (error){
      console.log(error)
    }
  }

  async function getOptimalList(){
    const request_data = {
      "hypotehsis": wordGoal,
       "remaining_list": optList
    }
    
    try{
      let response = await fetch("http://127.0.0.1:8000/", {
        method:  "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request_data)
    });
      let response_json = await response.json();
      setOptList(response_json.list);
      setChoices(updateList([...choices], count, wordGoal));
      setPatterns(updateList([...patterns], count, response_json.pattern));
      setCount(count+1);

      if(count >= 5 || response_json.pattern.toString()==='x,x,x,x,x'){
        setDeactivate(true);
        console.log('end');
      }
    } catch (error){
      console.log(error);
    }
  }

  const updateList = (data, idx, value)=> {
    let newArr = data;
    newArr[idx] = value;
    return newArr;
  }

  // allow the user to click in one of the options to automatically update the input field
  const chooseOption = (word) => {
    setWordGoal(word);
    console.log(word);
    console.log(wordGoal);
  }

  return (
    <div className="Page">
      <div className="App">
        <Header/>
        <form onSubmit={handleSubmit} className="form">
          <input id="word-input"
            name="word"
            type="text"
            onChange={e => setWordGoal(e.target.value)}
            minLength="5"
            maxLength="5"
            placeholder="word..."
          />
          <button id="submit-button">CHECK</button>
        </form>
        <div id="wordle-container">
          {choices.map((word, idx) => <WordRow word={word} pattern={patterns[idx]}/>)}  
        </div>
        <div>
          <div className="remaining-text">Remaining: {remaining}</div>
          <ListContainer wordList={optList} setOption={chooseOption}/>
        </div>
        
      </div>
    </div>
    
  );
}

export default App;
