import "./AnnotateField.css";
import React, {useEffect, useState} from "react";

function AnnotateField({data, ents}) {
  const [annotation, setAnnotation] = useState(<div></div>)
  const createJSXfromNE = (text, spans, ents) => {
      let listOfJSX = [];
      let offset = 0;

      spans.forEach(({type, start, end}) => {
        const entity = text.slice(start, end);
        const fragments = text.slice(offset, start).split('\n');

        fragments.forEach((fragment, i) => {
          console.log(fragment)
          listOfJSX.push(React.createElement('text', null, fragment));
          if (fragments.length > 1 && i !== fragments.length - 1) listOfJSX.push(React.createElement('br'));
        });
        const ltype = type.toLowerCase();
        if (ents.includes(ltype)) {
          const mark = React.createElement(
              'mark',
              {'data-entity': ltype},
              React.createElement('text', null, entity));
          listOfJSX.push(mark);
        } else {
          listOfJSX.push(React.createElement('text', null, entity));
        }

        offset = end;
      });

      listOfJSX.push(React.createElement('text', null, text.slice(offset, text.length)));

      // console.log(`%c💥  HTML markup\n%c<div class="entities">${this.container.innerHTML}</div>`, 'font: bold 16px/2 arial, sans-serif', 'font: 13px/1.5 Consolas, "Andale Mono", Menlo, Monaco, Courier, monospace');
      return <>{listOfJSX}</>
  }

  const reducer = (listOfEnts, currEnt) => {
    if (currEnt.isChosen) {
      listOfEnts.push(currEnt.name);
    }
    return listOfEnts
  }
  
  useEffect(() => {
    if (data && Object.keys(data).length !== 0 && ents.length !== 0) {
      const entities = ents.reduce(reducer, [])
      console.log(data)
      const newAnnotation = createJSXfromNE(data['text'], data['spans'], entities);
      setAnnotation(newAnnotation);
    }
    else setAnnotation(<div></div>)
  }, [data, ents])

  return (
      <div className={"entities"}>
          {annotation}
      </div>
  );
}

export default AnnotateField;