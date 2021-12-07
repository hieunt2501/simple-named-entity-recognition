import "./App.css";
import React, { useState } from "react";

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
  function setChecklist(i) {
    setEntities(entities.map((e, index) => {
      if (i === index) {
        e.isChosen = !e.isChosen;
        return e;
      }
      else return e;
    }));
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
          <div className="button-row">
            <button type="button" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
      <div className="output">

      </div>
    </div>
  );
}

export default App;
