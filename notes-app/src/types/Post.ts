export interface Post {
  id: number;
  title: string;
  content: string;
  published?: boolean;
  authorId?: number;
  author?: { id: number; name: string | null; email: string };
}