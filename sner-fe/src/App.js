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
    name: "Location",
    isChosen: true,
  },
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
    requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    };
    fetch("https://api.npms.io/v2/search?q=react", requestOptions) //change api url here
      .then((response) => response.json())
      .then((data) => setOutput(data.total));
  }

  return (
    <div className="App">
      <form className="form">
        <div className="row">
          <div className="col-6">
            <textarea
              id="text-area"
              value={text}
              onChange={(e) => setText(e.value)}
              className="form-control"
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
          <input
            type="button"
            onClick={submit}
            value="Submit"
            className="form-control"
          />
        </div>
      </form>
      <div className="col-5">{output}</div>
    </div>
  );
}

export default App;
