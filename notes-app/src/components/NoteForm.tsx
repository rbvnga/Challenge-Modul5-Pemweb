import { useState } from "react";
import type { Note } from "../types/Note";

interface Props {
  onAdd: (note: Omit<Note, "id">) => void;
}

export default function NoteForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Umum");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, content, category });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder="Judul"
      />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Isi" />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Umum</option>
        <option>Kuliah</option>
        <option>Pribadi</option>
      </select>
      <button type="submit">Tambah</button>
    </form>
  );
}