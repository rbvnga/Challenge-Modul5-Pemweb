import { useState } from "react";
import type { Note } from "./types/Note";
import { useLocalStorage } from "./hooks/useLocalStorage";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";

export default function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [search, setSearch] = useState("");

  const addNote = (data: Omit<Note, "id">) =>
    setNotes([...notes, { id: Date.now(), ...data }]);

  const deleteNote = (id: number) =>
    setNotes(notes.filter((n) => n.id !== id));

  const shown = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Papan Catatan</h1>
      <NoteForm onAdd={addNote} />
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari judul..." />
      {shown.map((n) => (
        <NoteCard key={n.id} note={n} onDelete={deleteNote} />
      ))}
    </div>
  );
}