import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <div className="flex h-screen w-screen bg-gray-500">
        <h1>Not Found 404</h1>
        <p>Requested Page Not Found</p>
        <p>
          Go Back To <Link href="/">Home</Link>
        </p>
      </div>
    </main>
  );
}
