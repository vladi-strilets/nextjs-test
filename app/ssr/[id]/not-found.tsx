import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-4">Character Not Found</h2>
      <Link href="/" className="text-blue-500 underline">
        Return Home
      </Link>
    </div>
  );
}
