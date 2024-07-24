// Static Site Generation (SSG)
// Use https://jsonplaceholder.typicode.com API to fetch post data by ID.

import { ServerSidePageProp } from "@/types/types";
import { logRender } from "@/utils/logRender";
import { ResponseError, smartFetch } from "@/utils/smartFetch";
import { notFound } from "next/navigation";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const BASE_URL = "https://jsonplaceholder.typicode.com";
const POSTS_DATA_PATH = "posts";

const getPosts = () => smartFetch<Post[]>(`${BASE_URL}/${POSTS_DATA_PATH}`);
const getPost = (id: string) =>
  smartFetch<Post>(`${BASE_URL}/${POSTS_DATA_PATH}/${id}`);

// let's get the list of all the posts to generate the static params
export async function generateStaticParams() {
  const { data: posts, error } = await getPosts();

  if (error) {
    return [];
  }

  const paths = posts.map((post) => ({ id: post.id.toString() }));
  return paths;
}

type PostPageProps = ServerSidePageProp<{ id: string }>;
export default async function PostPage(props: PostPageProps) {
  logRender("PostPage");

  const { params } = props;
  const { id } = params;

  const { data: post, error } = await getPost(id);

  if (error) {
    if (error instanceof ResponseError && error.response.status === 404) {
      notFound();
    } else {
      console.error("Error fetching post data", error);
      return null;
    }
  }

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-white rounded-lg p-4 shadow flex flex-col gap-2">
        <h1>SSG</h1>
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p>{post.body}</p>
        <p>Created by userId: {post.userId}</p>
        <p>Post id: {post.id}</p>
      </div>
    </div>
  );
}

// this config is true by default, but wanted to make it explicit
// if we hit a page that wasn't generated during the build, it will be generated on the fly
export const dynamicParams = true;
