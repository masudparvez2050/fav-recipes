"use client";

import { useEffect } from "react";
import Link from "next/link";
import { UtensilsCrossed, ChefHat, Home } from "lucide-react";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FDF8F4] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center space-x-4">
          <UtensilsCrossed className="w-16 h-16 text-orange-500" />
          <ChefHat className="w-16 h-16 text-orange-500" />
        </div>

        <h1 className="text-4xl font-bold text-gray-800">
          Oops! Recipe Not Found
        </h1>

        <p className="text-xl text-gray-600">
          Looks like weve burnt this one! Dont worry, we have plenty more
          delicious recipes for you.
        </p>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-orange-500 hover:bg-orange-600 text-white"
          >
            Try again
          </button>

          <button className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-200 hover:bg-gray-300 text-gray-800 ">
            <Link href="/" className=" flex items-center">
              <Home className="w-4 h-4 mr-2" />
             <span>Go to Home</span> 
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
