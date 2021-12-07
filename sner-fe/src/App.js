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
  const [output, setOutput] = useState("");
  function setChecklist(i) {
    setEntities(
      entities.map((e, index) => {
        if (i === index) {
          e.isChosen = !e.isChosen;
          return e;
        } else return e;
      })
    );
  }

  function submit() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    };
    fetch("https://api.npms.io/v2/search?q=react", requestOptions) //change api url here
      .then((response) => response.json())
      .then((data) => setOutput(data.total));
  }

  function clear() {
    document.getElementById("input-text-area").value = "";
    document.getElementById("output-text-area").value = "";
  }

  return (
    <div className="App">
      <div className="App-header container-fluid">
        <h1>Simple Named Entity Recognition</h1>
      </div>

      <div className="input container-fluid">
        <form className="form mb-3" >
          <div className="row">
            <div className="col-6 mb-5">
              <div className="row mb-3">
                <textarea
                  id="input-text-area"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="form-control"
                  rows={9}
                ></textarea>
              </div>

              <div className="flex-row d-flex justify-content-end">
                <div className="mb-3">
                  <button type="button" className="btn btn-danger" onClick={clear}>Clear</button>
                </div>
                <div className="mb-3">
                  <input
                    type="button"
                    onClick={submit}
                    value="Submit"
                    className="btn btn-success"
                  />
                </div>
              </div>

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
        </form>
      </div>

      <div className="col-6 output container-fluid">
        <textarea
          id="output-text-area"
          className="form-control"
          rows={9}
        >{output}</textarea>

      </div>

    </div>
  );
}

export default App;
