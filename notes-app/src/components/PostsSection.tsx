import { useState, useEffect } from "react";
import type { Post } from "../types/Post";
import { getPosts, createPost, deletePost } from "../api/posts";
import PostForm from "./PostForm";
import PostList from "./PostList";

export default function PostsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch(() => setError("Server tidak bisa dihubungi. Pastikan backend menyala."))
      .finally(() => setLoading(false));
  }, []);

const handleAdd = async (data: { title: string; content: string }) => {
  try {
    setActionError(null);
    const created = await createPost(data);
    setPosts((prev) => [created, ...prev]);
  } catch (err) {
    setActionError((err as Error).message);
  }
};

  const handleDelete = async (id: number) => {
    try {
      setActionError(null);
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setActionError((err as Error).message);
    }
  };

  return (
    <section className="posts">
      <h2>Posts dari API</h2>
      <PostForm onAdd={handleAdd} />
      {actionError && <p className="error">{actionError}</p>}
      {loading && <p className="empty">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && <PostList posts={posts} onDelete={handleDelete} />}
    </section>
  );
}