import "./App.css";
import React, { useState } from "react";
import AnnotateField from "./AnnotateField";
// import Form from "./Form"
const entitiesState = [
  {
    name: "per",
    isChosen: true,
  },
  {
    name: "org",
    isChosen: true,
  },
  {
    name: "geo",
    isChosen: true,
  },
  {
    name: "gpe",
    isChosen: true,
  },
  {
    name: "tim",
    isChosen: true,
  },
  {
    name: "art",
    isChosen: true,
  },
  {
    name: "event",
    isChosen: true,
  },
  {
    name: "npe",
    isChosen: true,
  }
];

function App() {
  const [text, setText] = useState("");
  const [entities, setEntities] = useState(entitiesState);
  const [output, setOutput] = useState({
    "text": "But Google is starting from behind.",
   "spans": [{"start": 4, "end": 10, "type": "ORG"}],
});
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
    setOutput({"text": "", "spans": []})
  }

  return (
    <div className="App">
      <div className="App-header container-fluid">
        <h1>Simple Named Entity Recognition</h1>
      </div>

      <div className="input container-fluid">
        <form className="form" >
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

            <div className="col-6 mb-5">
              <h4 className="name">Entity Labels:</h4>
              {entities.map((entity, i) => (
                <span className="badge rounded-pill">
                  <input
                    type="checkbox"
                    id={entity.name}
                    name="entity"
                    defaultChecked={entity.isChosen}
                    onChange={(e) => setChecklist(i)}
                  />
                  <label for={entity.name}>{entity.name}</label>
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>

      <div className="col-12 output container-fluid p-0">
        {/* <textarea
          id="output-text-area"
          className="form-control"
          rows={9}
          cols={20}
        >{output}</textarea> */}
        <AnnotateField data={output} ents={entities}/>
      </div>

    </div>
  );
}

export default App;
