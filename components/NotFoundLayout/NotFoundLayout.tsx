import Link from "next/link";

type NotFoundLayoutProps = {
  item: string;
};
export const NotFoundLayout = (props: NotFoundLayoutProps) => {
  const { item } = props;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-4">{`${item} Not Found`} </h2>
      <Link href="/" className="text-blue-500 underline">
        Return Home
      </Link>
    </div>
  );
};
