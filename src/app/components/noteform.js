"use client";
import addNote from "@/firebase/firestore/addNote";
import { useAuthContext } from "@/context/AuthContext";
import { useNotesContext } from "@/context/NotesContext";
import React from "react";
import Message from "./message";
import BtnLoading from "./btnloading";
export default function NoteForm() {
  const { user } = useAuthContext();
  const { notes, setNotes } = useNotesContext();
  const [title, setTitle] = React.useState("");
  const [note, setNote] = React.useState("");
  const [st, setSt] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleForm = async (event) => {
    event.preventDefault();
    if (note && title) {
      setLoading(true);
      let newNote = {
        title,
        note,
        noteDate: Date.now(),
      };
      const { result, error } = await addNote(user.uid, newNote);

      setLoading(false);
      if (error) {
        console.log(error);
        setSt({ state: false, msg: "Error: Faild To Save The Note." });
        return;
      } else {
        setSt({ state: true, msg: "Sucesse: The Note Is Saved." });
        newNote.id = result.id;
        setNotes([newNote, ...notes]);
        setNote("");
        setTitle("");
        setTimeout(() => {
          setSt(null);
        }, 1000);
      }
    }
  };
  return (
    <form
      onSubmit={handleForm}
      className="form flex flex-col items-center max-h-min rounded-xl border-2 border-green-500 text-green-500 p-2">
      <div>
        <label htmlFor="title">
          <p>Title</p>
          <input
            className="bg-white rounded-xl w-full border-2 border-gray-500 p-2"
            onChange={(e) => setTitle(e.target.value)}
            required
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="note title"
          />
        </label>
      </div>
      <div>
        <label htmlFor="note">
          <p>Note</p>
          <textarea
            className="bg-white h-45 rounded-xl w-full border-2 border-gray-500 p-4"
            onChange={(e) => setNote(e.target.value)}
            required
            type="text"
            name="note"
            id="note"
            value={note}
            placeholder="note"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-white border-2 border-green-500 disabled:bg-white disabled:text-black p-2 w-full rounded-2xl hover:border-gray-500 hover:bg-green-500 hover:text-white">
        <div className="flex items-center justify-around">
          <h1>Save</h1>
          {loading && <BtnLoading />}
        </div>
      </button>
      {st && <Message msg={st.msg} err={!st.state} />}
    </form>
  );
}
