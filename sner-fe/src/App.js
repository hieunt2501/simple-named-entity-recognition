import "./App.css";
import React, { useEffect, useState } from "react";
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
    name: "eve",
    isChosen: true,
  },
  {
    name: "npe",
    isChosen: true,
  }
];
const textState = "Khoa, Hieu, Khoi, Minh works together in this project."

function App() {
  const [text, setText] = useState(textState);
  const [entities, setEntities] = useState(entitiesState);
  const [output, setOutput] = useState({});
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
    fetch("http://127.0.0.1:5000/res", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setOutput(data)}
        );
  }

  function clear() {
    const emptyText = "";
    const emptyOutput = {}
    setText(emptyText)
    setOutput(emptyOutput)
  }

  useEffect(submit, []);

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
                <div className="mb-3 mx-3">
                  <button type="button" className="btn btn-danger rounded-0" onClick={clear}>Clear</button>
                </div>
                <div className="mb-3">
                <input
                    type="button"
                    onClick={submit}
                    value="Submit"
                    className="btn btn-success rounded-0"
                  /> 
                </div>
              </div>

            </div>

            <div className="col-6 mb-5">
              <h4 className="name">Entity Labels:</h4>
              {entities.map((entity, i) => (
                <span className="badge rounded-0">
                  <input
                    type="checkbox"
                    id={entity.name}
                    name="entity"
                    defaultChecked={entity.isChosen}
                    onChange={(e) => setChecklist(i)}
                  />
                  <label 
                    className={"entity-button " + ((entity.isChosen)? (entity.name+"-button-activate"): "")}
                    for={entity.name}>
                    {entity.name.toUpperCase()}
                  </label>
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>

      <div className="row w-100 m-0 output-section">
      <div className="col-8 output container-fluid p-0 align-self-center">
        <AnnotateField data={output} ents={entities}/>
      </div>
      </div>
    </div>
  );
}

export default App;
