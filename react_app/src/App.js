import {useState, useEffect} from "react";

import WordRow from "./components/WordRow";
import './static/styles.css'

function App() {
  const [wordleList, setWordleList] = useState([]);
  const [optList, setOptList] = useState([]);
  const [wordGoal, setWordGoal] = useState('');
  const [count, setCount] = useState(0);
  const [choices, setChoices] = useState(['     ', '     ', '     ', '     ', '     ', '     ']);
  const [patterns, setPatterns] = useState(['     ', '     ', '     ', '     ', '     ', '     ']);

  useEffect(() => {
    getInitialList();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    getOptimalList();
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
      console.log(response_json.pattern);
      setChoices(updateList([...choices], count, wordGoal));
      setPatterns(updateList([...patterns], count, response_json.pattern));
      setCount(count+1);
    } catch (error){
      console.log(error);
    }
  }

  const updateList = (data, idx, value)=> {
    let newArr = data;
    newArr[idx] = value;
    return newArr;
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          name="word"
          type="text"
          onChange={e => setWordGoal(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <div id="wordle-container">
        {choices.map((word, idx) => <WordRow word={word} pattern={patterns[idx]}/>)}  
      </div>
      <div>
        {optList.map((word) => <div>{word}</div>)}
      </div>
      
    </div>
  );
}

export default App;
