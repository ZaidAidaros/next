import DeleteNoteBtn from "./deletenotebtn";

export default function NoteCard({ note }) {
  return (
    <div className="bg-white flex flex-col justify-between rounded-2xl border-2 w-full p-2 mb-1">
      <div className="flex justify-between w-full mx-2">
        <h1 className="text-green-500">{note.title}</h1>
        <DeleteNoteBtn id={note.id} />
      </div>

      <div>
        <p>{note.note}</p>
      </div>

      <p className="bg-gray-300 m-3 p-2 rounded-2xl">
        {Date(note.noteDate).toLocaleUpperCase()}
      </p>
    </div>
  );
}
