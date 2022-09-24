import {useState, useEffect} from "react";

function App() {
  const [wordleList, setWordleList] = useState([]);
  const [optList, setOptList] = useState([]);
  const [wordGoal, setWordGoal] = useState('');

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
    } catch (error){
      console.log(error);
    }
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
      {optList.map((word) => <div>{word}</div>)}
    </div>
  );
}

export default App;
