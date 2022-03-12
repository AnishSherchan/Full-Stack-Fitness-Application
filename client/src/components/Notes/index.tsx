import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
const ListNotes = () => {
  const [notes, setNotes] = useState([]);
  const [descs, setDescs] = useState("");
  const [note_id, setId] = useState(null);
  // ? modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    let notes = descs;
    try {
      const body = {
        notes,
        note_id,
      };
      console.log(body);
      const response = await fetch("http://localhost:5000/notes/notes", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      console.log(parseRes);
      setIsModalVisible(false);
      window.location.href = "/Notes";
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const editNotes = async (id, desc) => {
    setId(id);
    setDescs(desc);
    console.log(descs);
    console.log(note_id);
    showModal();
  };
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
      console.log(parseRes);
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
            <button
              className="mx-3"
              onClick={() => editNotes(note.note_id, note.notes)}
            >
              {" "}
              <img
                src="https://cdn-icons-png.flaticon.com/128/2919/2919592.png"
                style={{ height: "30px" }}
                alt="edit"
              />
            </button>
            <button onClick={() => deleteNotes(note.note_id)}>
              {" "}
              <img
                src="https://freepikpsd.com/file/2019/10/delete-icon-png-red-5-Transparent-Images.png"
                style={{ height: "30px" }}
                alt="edit"
              />
            </button>
          </div>
        </div>
      ))}
      <Modal
        title="Edit Notes"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={descs}
          onChange={(e) => {
            setDescs(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};

export default ListNotes;
