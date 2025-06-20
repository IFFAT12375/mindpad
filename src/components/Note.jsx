import React, { useState } from "react";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content,
  });

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSaveClick() {
    props.onEdit(props.id, editedNote);
    setIsEditing(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  function handleToggleDone() {
    props.onToggleDone(props.id);
  }

  return (
    <div className="note">
      {isEditing ? (
        <div>
          <input
            name="title"
            value={editedNote.title}
            onChange={handleChange}
          />
          <textarea
            name="content"
            value={editedNote.content}
            onChange={handleChange}
            rows="3"
          />  
        </div>
      ) : (
        <div>
           <input
            type="checkbox"
            checked={props.isDone}
            onChange={handleToggleDone}
            disable={isEditing}
          />
          <h1
            style={{ textDecoration: props.isDone ? "line-through" : "none" }}
          >
            {props.title}
          </h1>
          <p style={{ textDecoration: props.isDone ? "line-through" : "none" }}>
            {props.content}
          </p>
        </div>
      )}
      <div className="actions">
    <div>
      {isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  </div>
    </div>
  );
}

export default Note;
