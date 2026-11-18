const [posts, setPosts] = useState<Post[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      if (!res.ok) throw new Error("Gagal memuat data");
      return res.json();
    })
    .then((data: Post[]) => setPosts(data))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, []);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;