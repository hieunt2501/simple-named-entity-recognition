import "./App.css";
import React, { useEffect, useState } from "react";

const entitiesState = [
  {
    name: "Person",
    isChosen: true,
  },
  {
    name: "Organization",
    isChosen: true,
  },
  {
    name: "Geopgraphical Entity",
    isChosen: true,
  },
  {
    name: "Geopolitical Entity",
    isChosen: true,
  },
  {
    name: "Time indicator",
    isChosen: true,
  },
  {
    name: "Artifact",
    isChosen: true,
  },
  {
    name: "Event",
    isChosen: true,
  },
  {
    name: "Natural Phenomenon",
    isChosen: true,
  }
];

function App() {
  const [text, setText] = useState("");
  const [entities, setEntities] = useState(entitiesState);
  const [output, setOutput] = useState("");
  function setChecklist(i) {
    setEntities(entities.map((e, index) => {
      if (i === index) {
        e.isChosen = !e.isChosen;
        return e;
      }
      else return e;
    }));
  }

  function submit() {
    fetch('https://api.npms.io/v2/search?q=react') //change api url here
        .then(response => response.json())
        .then(data => setOutput(data.total));
  }

  return (
    <div className="App">
      <div className="App-header container-fluid">
        <form className="form" >
          <div className="row">
            <div className="col-6">
              <textarea
                id="text-area"
                value={text}
                onChange={(e) => setText(e.value)}
                className="form-control"
                rows={6}
              ></textarea>
            </div>
            <div className="col-6">
              {entities.map((entity, i) => (
                <div>
                  <input
                    type="checkbox"
                    id={entity.name}
                    name={entity.name}
                    defaultChecked={entity.isChosen}
                    onChange={(e) => setChecklist(i)}
                  />
                  <label for={entity.name}>{entity.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
          <input type="button" onClick={submit} value = "Submit" className="form-control" />
        </div>
        </form>
      </div>
      <div className="output">
        <div className="col-5">{output}</div>
      </div>
      
      
    </div>
  );
}

export default App;
