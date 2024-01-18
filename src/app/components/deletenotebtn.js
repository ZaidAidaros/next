"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useNotesContext } from "@/context/NotesContext";
import deleteNote from "@/firebase/firestore/deleteNote";
import BtnLoading from "./btnloading";
import { useState } from "react";

export default function DeleteNoteBtn({ id }) {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { notes, setNotes } = useNotesContext();
  const hundelDelete = async () => {
    setLoading(true);
    const state = await deleteNote(user.uid, id);
    setLoading(false);
    if (state) {
      setNotes([...notes.filter((el) => el.id !== id)]);
    }
  };
  return (
    <button
      onClick={hundelDelete}
      disabled={loading}
      className="items-center rounded-2xl p-1 disabled:bg-gray-500 border-2 border-red-500 hover:bg-red-500 mx-2">
      <h1>X</h1>
      {loading && <BtnLoading />}
    </button>
  );
}
