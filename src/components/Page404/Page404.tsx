"use client";

import React from "react";
import Link from "next/link";

const Page404: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center p-4 bg-gray-100">
      <h1 className="text-8xl font-extrabold text-gray-800 mb-6">Oops!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Seems like you are not allowed to be here.
      </p>
      <Link
        href="/"
        className="text-white bg-green-olive hover:bg-green-dark px-4 py-2 rounded-lg text-sm font-medium"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Page404;
