"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchRecipes from "./SearchRecipes";

// Navigation data
const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Latest Recipes", href: "/#latest-recipes" },
  { name: "HandPicked", href: "/#hand-picked" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu on mobile

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  return (
    <header className="w-full flex justify-center mx-auto px-4 py-4 shadow-lg fixed top-0 bg-white z-50">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold">
          <Image
            src="/assets/lws-kitchen.png"
            className="h-[40px] w-[40px]"
            alt="lws-kitchen"
            width={50}
            height={50}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="hover:text-orange-500">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <SearchRecipes />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center space-x-2"
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
          <ul className="space-y-4 py-4 px-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block hover:text-orange-500"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
