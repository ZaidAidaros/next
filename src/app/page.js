"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import NoteForm from "./components/noteform";
import NotesList from "./components/notelist";
import { NotesContextProvider } from "@/context/NotesContext";
import logOut from "@/firebase/auth/logout";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();

  React.useEffect(() => {
    if (user === null) {
      router.push("/auth/signin");
    }
  }, [user]);

  return (
    <div className="bg-gray-500 flex flex-col  p-8 min-h-screen">
      <div className="flex h-10  justify-between px-2">
        <h1 className="text-green-500  text-xl">Notes App</h1>
        <button onClick={logOut} className="text-blue-500  text-xl">
          Log Out
        </button>
      </div>

      <div className="flex flex-col rounded-2xl border-2 border-green-500 h-16 p-2 text-white">
        {user && (
          <div>
            <p>{user.email}</p>
          </div>
        )}
      </div>

      <main className="flex justify-between mt-2">
        <NotesContextProvider>
          <NoteForm />
          <NotesList />
        </NotesContextProvider>
      </main>
    </div>
  );
}
