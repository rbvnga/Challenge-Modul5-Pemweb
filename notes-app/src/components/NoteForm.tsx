import { useState } from "react";
import { CATEGORIES, type Note } from "../types/Note";

interface Props {
  onAdd: (data: Omit<Note, "id" | "done">) => void;
}

export default function NoteForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    onAdd({ title: title.trim(), content: content.trim(), category });
    setTitle("");
    setContent("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder="Judul catatan"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Isi catatan"
        rows={2}
      />
      <div className="row">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button type="submit" className="btn-primary">+ Tambah</button>
      </div>
    </form>
  );
}