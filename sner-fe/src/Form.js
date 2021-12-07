import React, {useState} from "react";
import "./Form.css"
const DEFAULT_TEXT = "default example: Hieu works full-time at TMT."
function Form({handleSubmit}) {
    const [text, setText] = useState(DEFAULT_TEXT);

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
    }

    const handleSubmitForm = (event) => {
        event.preventDefault()
        handleSubmit(text)
    }
    return (
        <>
        <form id="myform" onSubmit={handleSubmit}>
            <textarea rows={100} cols={20} value={text} onChange={handleChange} />
        </form>
        <button type="submit" form={"myform"}>Analyze</button>
        </>)
}

export default Form