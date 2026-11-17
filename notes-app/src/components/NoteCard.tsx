import type { Note } from "../types/Note";

interface Props {
  note: Note;
  onDelete: (id: number) => void;
}

export default function NoteCard({ note, onDelete }: Props) {
  return (
    <div className="card">
      <h3>{note.title}</h3>
      <small>{note.category}</small>
      <p>{note.content}</p>
      <button onClick={() => onDelete(note.id)}>Hapus</button>
    </div>
  );
}