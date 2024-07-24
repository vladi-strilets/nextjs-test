// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import "server-only";

import { smartFetch } from "@/utils/smartFetch";
import { Article } from "../components/ArticleCard";

export type NewsResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};

export const BASE_URL = "https://newsapi.org";
export const NEWS_API_VERSION = "v2";
export const NEWS_TOP_HEADLINES_PATH = "top-headlines";

export const country = "us"; // we hardcode the country, but can be also a query param

export const getNews = async (category: string) => {
  const url = `${BASE_URL}/${NEWS_API_VERSION}/${NEWS_TOP_HEADLINES_PATH}?country=${country}&category=${category}`;

  return await smartFetch<NewsResponse>(url, {
    headers: {
      // we force the type, but in a real app we would check if the env var is presented before running the app
      Authorization: process.env.ISR_NEWS_API_KEY!,
    },
    next: {
      revalidate: 60, // let's set the revalidation time to 1 minute, we will see the X-Nextjs-Cache: STALE response after 1 min
    },
  });
};
