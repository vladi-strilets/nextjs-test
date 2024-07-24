import Link from "next/link";

export type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
};

export const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div key={article.url} className="bg-white rounded-lg shadow-md">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
        {article.description && (
          <p className="text-gray-600">{article.description}</p>
        )}
        <Link
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};
