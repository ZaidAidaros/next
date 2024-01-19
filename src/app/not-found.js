import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-500 text-white text-center">
        <h1>Not Found 404</h1>
        <p>Requested Page Not Found</p>
        <p>
          Go Back To{" "}
          <Link href="/" className="text-green-500">
            Home
          </Link>
        </p>
      </div>
    </main>
  );
}
