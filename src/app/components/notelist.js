"use client";
import getNotes from "@/firebase/firestore/getNotes";
import NoteCard from "./note";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useNotesContext } from "@/context/NotesContext";
import Loading from "./loading";
import Message from "./message";

export default function NotesList() {
  const { user } = useAuthContext();
  const { notes, setNotes } = useNotesContext(null);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);
  const fetchNotes = (uid) => {
    getNotes(uid).then(({ notes, error }) => {
      if (error) {
        setErr("Error: Faild To Load Notes");
      } else {
        setNotes(notes);
      }
      setLoading(false);
      setErr(null);
    });
  };
  React.useEffect(() => {
    if (user) {
      fetchNotes(user.uid);
    }
  }, []);
  return (
    <div className="flex flex-col w-full justify-top rounded-2xl border-2 border-green-500  mx-2 p-2">
      <div className="h-80 overflow-y-auto scroll-smooth scroll-m-1 p-2">
        {loading ? (
          <Loading />
        ) : err ? (
          <Message msg={err} err={err} />
        ) : notes.length ? (
          <ol>
            {notes.map((note) => (
              <li key={note.id}>
                <NoteCard note={note} />
              </li>
            ))}
          </ol>
        ) : (
          <Message msg="No Notes" />
        )}
      </div>
    </div>
  );
}
