// Static Site Generation (SSG)
// Use https://jsonplaceholder.typicode.com API to fetch post data by ID.

import { ServerSidePageProp } from "@/types/types";
import { logRender } from "@/utils/logRender";
import { ResponseError, smartFetch } from "@/utils/smartFetch";
import Link from "next/link";
import { notFound } from "next/navigation";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const BASE_URL = "https://jsonplaceholder.typicode.com";
const POSTS_DATA_PATH = "posts";

// we don't specify any cache control, so the default value 'force-cache' will be used and the data will be cached
const getPosts = () => smartFetch<Post[]>(`${BASE_URL}/${POSTS_DATA_PATH}`);
const getPost = (id: string) =>
  smartFetch<Post>(`${BASE_URL}/${POSTS_DATA_PATH}/${id}`);

// let's get the list of all the posts to generate the static params
// but prerender only the first 5 posts
export async function generateStaticParams() {
  const { data: posts, error } = await getPosts();

  if (error) {
    return [];
  }

  const paths = posts.map((post) => ({ id: post.id.toString() })).slice(0, 5);
  return paths;
}

type PostPageProps = ServerSidePageProp<{ id: string }>;
export default async function PostPage(props: PostPageProps) {
  logRender("PostPage");

  const { params } = props;
  const { id } = params;

  // check if id is a number
  if (isNaN(Number(id))) {
    notFound();
  }

  const { data: post, error } = await getPost(id);

  if (error) {
    if (error instanceof ResponseError && error.response.status === 404) {
      notFound();
    } else {
      console.error("Error fetching post data", error?.message);
      return null;
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold">SSG</h1>
      <p className="text-2xl font-bold">Post id: {id}</p>
      <p>
        The first 5 posts are prerendered, the rest of the posts will be
        generated on the fly and saved as static pages. But make sure you run it
        in production mode. To test it, check the response X-Nextjs-Cache header
        of the page. If we have MISS, that means the page was generated on the
        fly. If we refresh the same page, we will see HIT, which means the page
        was served from the cache. We can also see new files in the
        .next/server/app/ssg folder.
      </p>
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg p-4 shadow flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p>{post.body}</p>
          <p>Created by userId: {post.userId}</p>
          <p>Post id: {post.id}</p>
        </div>
      </div>
    </div>
  );
}

// this config is true by default, but wanted to make it explicit
// if we hit a page that wasn't generated during the build, it will be generated on the fly
export const dynamicParams = true;
