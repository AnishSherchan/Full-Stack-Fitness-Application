import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
const ListNotes = () => {
  const [notes, setNotes] = useState([]);
  const deleteNotes = async (note_id) => {
    console.log(note_id);
    try {
      const response = await fetch(
        `http://localhost:5000/notes/notes/${note_id}`,
        {
          method: "DELETE",
        }
      );

      const parseRes = await response.json();
      console.log(parseRes);
      setNotes(notes.filter((note) => note.note_id !== note_id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const getNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/notes/notes", {
        method: "get",
        headers: {
          token: localStorage.token,
        },
      });
      const parseRes = await response.json();
      setNotes(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="flex justify-evenly flex-wrap">
      {notes.map((note) => (
        <div className="flex mt-5 p-5 rounded-3xl drop-shadow-2xl flex-col w-80  md:w-96 align-middle  bg-notes border-2 border-notesBorder">
          <p className="text-lg">{note.notes}</p>
          <div className="flex justify-end">
            <button onClick={() => deleteNotes(note.note_id)}>
              {" "}
              <img
                src="https://img.icons8.com/plasticine/344/filled-trash.png"
                style={{ height: "45px" }}
                alt="edit"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListNotes;
