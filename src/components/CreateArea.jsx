import React, { useState } from "react";

function CreateArea(props) {
  const [inputText, setInputText] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setInputText((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    if (inputText.title || inputText.content) {
      props.onAdd(inputText);
      setInputText({
        title: "",
        content: "",
      });
    }
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={inputText.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={inputText.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
