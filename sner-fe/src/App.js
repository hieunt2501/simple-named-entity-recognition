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
    name: "Location",
    isChosen: true,
  },
];

function App() {
  const [text, setText] = useState("");
  const [entities, setEntities] = useState(entitiesState);
  function setChecklist(i) {
    setEntities(entities.map((e,index) => {
      if (i === index) {
        e.isChosen = !e.isChosen;
        return e;
      }
      else return e;
    }));
  }
  return (
    <div className="App">
      <form class="form" >
        <div class="row">
          <div class="col-6">
            <textarea
              id="text-area"
              value={text}
              onChange={(e)=>setText(e.value)}
              class="form-control"
            ></textarea>
          </div>
          <div class="col-6">
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
        <div class="button-row">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
