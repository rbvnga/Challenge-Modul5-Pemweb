import { useState } from "react";

interface Props {
  onAdd: (data: { title: string; content: string }) => void;
}

export default function PostForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    onAdd({ title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder="Judul post"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Isi post"
        rows={2}
      />
      <button type="submit" className="btn-primary">+ Kirim Post</button>
    </form>
  );
}