// Incremental Static Regeneration (ISR)

// Use https://newsapi.org API to fetch news data by category.
// This API will require you to create an account to get an API key.

import { ServerSidePageProp } from "@/types/types";
import { logRender } from "@/utils/logRender";
import Link from "next/link";
import { ArticleCard } from "./components/ArticleCard";
import { getNews } from "./utils/getNews";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

// we know in advance the available categories, so let's prefetch the data for them
export function generateStaticParams() {
  const paths = categories.map((category) => ({ category }));
  return paths;
}

type NewsPageProps = ServerSidePageProp<{ category: string }>;
export default async function NewsPage(props: NewsPageProps) {
  logRender("NewsPage");

  const { params } = props;
  const { category } = params;

  const { data: news, error } = await getNews(category);

  // notFound() is not needed, as we have set config dynamicParams = false

  if (error) {
    console.error("Error fetching news data", error?.message);
    return null;
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
      <h1 className="text-3xl font-bold">ISR</h1>
      <p className="text-2xl font-bold">Category: {category}</p>
      <p>
        Check the response X-Nextjs-Cache header of the page: after 1 min, STALE
        option will be returned, which means, the page was revalidated in the
        background.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {news.articles.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
}

// we know what the available categories are, let's return 404 for not valid options
export const dynamicParams = false;
