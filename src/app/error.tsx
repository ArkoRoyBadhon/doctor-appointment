"use client";

import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-8">Oops! Something went wrong.</h1>

      <Link href="/" className="text-blue-500 text-lg hover:underline">
        Go back to home
      </Link>
    </div>
  );
};

export default ErrorPage;
