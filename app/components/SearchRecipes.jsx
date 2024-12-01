"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Recipes from "/public/data/recipes.json";
import Categories from "/public/data/categories.json";
import Image from "next/image";

const SearchRecipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const searchRef = useRef(null);

  // Debounce implementation
  useEffect(() => {
    if (searchQuery.trim()) {
      const handler = setTimeout(() => {
        setDebouncedQuery(searchQuery.trim());
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    } else {
      setDebouncedQuery("");
      setFilteredRecipes([]);
    }
  }, [searchQuery]);

  // Filter recipes when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery) {
      const results = Recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredRecipes(results);
    } else {
      setFilteredRecipes([]);
    }
  }, [debouncedQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  // Get category name by category_id
  const getCategoryName = (categoryId) => {
    const category = Categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <div className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-orange-400 bg-white">
        <input
          type="text"
          className="flex-grow focus:outline-none text-sm"
          placeholder="Search recipes..."
          value={searchQuery}
          onFocus={handleInputFocus}
          onChange={(e) => {
            const input = e.target.value.trimStart(); // Ignore leading spaces
            setSearchQuery(input); // Update query with meaningful input
          }}
        />
        <span className="text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>

      {/* Filtered Recipes List */}
      {isDropdownVisible && debouncedQuery && (
        <ul className="absolute left-0 w-full mt-1 border border-gray-300 rounded-lg bg-white shadow-lg max-h-64 overflow-y-auto z-10">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => {
              const categoryName = getCategoryName(recipe.category_id);
              return (
                <li
                  key={recipe.id}
                  className="flex items-center p-2 hover:bg-orange-100 cursor-pointer"
                  onClick={() => setIsDropdownVisible(false)} // Close dropdown on click
                >
                  <Image
                    src={`/assets/thumbs/${recipe.thumbnail}`}
                    alt={recipe.title}
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-md object-cover mr-3"
                  />
                  <Link
                    href={`/${encodeURIComponent(
                      categoryName
                    )}/${encodeURIComponent(recipe.title)}`}
                    className="flex-grow"
                  >
                    <p className="text-sm text-orange-600 hover:underline">
                      {recipe.title}
                    </p>
                    <p className="text-xs text-gray-500">{categoryName}</p>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="p-4 text-gray-500 text-center">No recipes found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchRecipes;
