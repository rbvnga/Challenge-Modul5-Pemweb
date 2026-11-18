import type { Note } from "../types/Note";

interface Props {
  note: Note;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function NoteCard({ note, onToggle, onDelete }: Props) {
  return (
    <li className={note.done ? "note done" : "note"}>
      <div className="note-body">
        <strong>{note.title}</strong>
        {note.content && <p>{note.content}</p>}
        <span className="tag">{note.category}</span>
      </div>
      <div className="note-actions">
        <button onClick={() => onToggle(note.id)}>
          {note.done ? "Batal" : "Selesai"}
        </button>
        <button className="danger" onClick={() => onDelete(note.id)}>
          Hapus
        </button>
      </div>
    </li>
  );
}