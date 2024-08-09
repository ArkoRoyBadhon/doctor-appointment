import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-8">404 - Page Not Found</h1>
      <p className="text-2xl mb-8">
        {`The page you're looking for doesn't exist`}.
      </p>
      <Link href="/" className="text-blue-500 text-lg hover:underline">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
