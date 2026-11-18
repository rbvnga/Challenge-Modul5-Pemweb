import PostsSection from "./components/PostsSection";
import { useState } from "react";
import { CATEGORIES, type Note } from "./types/Note";
import { useLocalStorage } from "./hooks/useLocalStorage";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";


type StatusFilter = "semua" | "belum" | "selesai";

export default function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("semua");
  const [category, setCategory] = useState("semua");

  const addNote = (data: Omit<Note, "id" | "done">) =>
    setNotes([...notes, { id: Date.now(), done: false, ...data }]);

  const toggleNote = (id: number) =>
    setNotes(notes.map((n) => (n.id === id ? { ...n, done: !n.done } : n)));

  const deleteNote = (id: number) => setNotes(notes.filter((n) => n.id !== id));

  const clearDone = () => setNotes(notes.filter((n) => !n.done));

  const shown = notes.filter((n) => {
    const cocokJudul = n.title.toLowerCase().includes(search.toLowerCase());
    const cocokStatus =
      status === "semua" || (status === "selesai" ? n.done : !n.done);
    const cocokKategori = category === "semua" || n.category === category;
    return cocokJudul && cocokStatus && cocokKategori;
  });

  const remaining = notes.filter((n) => !n.done).length;

  return (
    <div className="app">
      <h1>Papan Catatan</h1>
      <p className="subtitle">Catat, cari, dan selesaikan.</p>

      <NoteForm onAdd={addNote} />

      <input
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari judul..."
      />

      <div className="filters">
        {(["semua", "belum", "selesai"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            className={status === s ? "chip active" : "chip"}
            onClick={() => setStatus(s)}
          >
            {s === "semua" ? "Semua" : s === "belum" ? "Belum Selesai" : "Selesai"}
          </button>
        ))}
      </div>

      <div className="filters">
        {["semua", ...CATEGORIES].map((c) => (
          <button
            key={c}
            className={category === c ? "chip active" : "chip"}
            onClick={() => setCategory(c)}
          >
            {c === "semua" ? "Semua Kategori" : c}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="empty">
          {notes.length === 0 ? "Belum ada catatan." : "Tidak ada catatan di filter ini."}
        </p>
      ) : (
        <ul className="note-list">
          {shown.map((n) => (
            <NoteCard key={n.id} note={n} onToggle={toggleNote} onDelete={deleteNote} />
          ))}
        </ul>
      )}

      <footer>
        <span>{remaining} catatan tersisa</span>
        <button className="link" onClick={clearDone}>Hapus yang Selesai</button>
      </footer>
               <PostsSection />  
    </div>
  );
}