import type { Post } from "../types/Post";

const BASE = "http://localhost:3000/api";

async function parse(res: Response) {
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message ?? `Gagal (status ${res.status})`);
  return json;
}

export async function getPosts(): Promise<Post[]> {
  const json = await parse(await fetch(`${BASE}/posts`));
  return json.data;
}

export async function createPost(data: { title: string; content: string }): Promise<Post> {
  const json = await parse(
    await fetch(`${BASE}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, authorId: 1 }),
    })
  );
  return json.data;
}

export async function deletePost(id: number): Promise<void> {
  await parse(await fetch(`${BASE}/posts/${id}`, { method: "DELETE" }));
}