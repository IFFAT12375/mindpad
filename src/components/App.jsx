import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

   useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(inputText) {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: uuidv4(),
        title: inputText.title,
        content: inputText.content,
        isDone: false,
      },
    ]);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;
      });
    });
  }

  function editNote(id, editedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((noteItem) =>
        noteItem.id === id
          ? {
              ...noteItem,
              title: editedNote.title,
              content: editedNote.content,
            }
          : noteItem
      )
    );
  }

  function toggleDone(id) {
    setNotes((prevNotes) =>
      prevNotes.map((noteItem) =>
        noteItem.id === id
          ? { ...noteItem, isDone: !noteItem.isDone }
          : noteItem
      )
    );
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="notes-container">
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            isDone={noteItem.isDone}
            onDelete={deleteNote}
            onEdit={editNote}
            onToggleDone={toggleDone}
          />
        );
      })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
