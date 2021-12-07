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
    fetch("https://api.npms.io/v2/search?q=react", requestOptions)
      .then((response) => response.json())
      .then((data) => setOutput(data));
  }

  function clear() {
    const emptyText = "";
    const emptyOutput = {}
    setText(emptyText)
    setOutput(emptyOutput)
  }

  // useEffect(submit, []);

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
                  <button
                    onClick={submit}
                    className="btn btn-success rounded-0"
                  >                
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill mr-1" viewBox="0 0 16 16">
                      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                    </svg>   */}
                    Submit
                  </button>
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

      <div className="col-12 output container-fluid p-0">
        <AnnotateField data={output} ents={entities}/>
      </div>

    </div>
  );
}

export default App;
