import type { Post } from "../types/Post";

interface Props {
  posts: Post[];
  onDelete: (id: number) => void;
}

export default function PostList({ posts, onDelete }: Props) {
  if (posts.length === 0) return <p className="empty">Belum ada post.</p>;

  return (
    <ul className="note-list">
      {posts.map((p) => (
        <li key={p.id} className="note">
          <div className="note-body">
            <strong>{p.title}</strong>
            <p>{p.content}</p>
            {p.author && <span className="tag">{p.author.name ?? p.author.email}</span>}
          </div>
          <div className="note-actions">
            <button className="danger" onClick={() => onDelete(p.id)}>Hapus</button>
          </div>
        </li>
      ))}
    </ul>
  );
}