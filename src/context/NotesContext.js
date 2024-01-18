"use client";
import React from "react";

export const NotesContext = React.createContext({});

export const useNotesContext = () => React.useContext(NotesContext);

export const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = React.useState([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
