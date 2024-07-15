// Static Site Generation (SSG)
// Use https://jsonplaceholder.typicode.com API to fetch post data by ID.

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default async function PostPage() {
  return <div>SSG</div>;
}
