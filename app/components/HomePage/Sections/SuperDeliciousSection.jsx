"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Recipes from "/public/data/recipes.json";
import Categories from "/public/data/categories.json";

// Top Three Recipes for Super Delicious Section
const topThreeRecipes = Recipes.sort(
  (a, b) => b.rating.average_rating - a.rating.average_rating
).slice(0, 3);

export default function SuperDeliciousSection() {
  return (
    <section className="mb-16" id="super_delicious">
      <motion.h2
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Super Delicious
      </motion.h2>
      <motion.div
        className="grid md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        {topThreeRecipes.map((recipe) => {
          // Find the category for the current recipe
          const category = Categories.find(
            (cat) => cat.id === recipe.category_id
          )?.name;

          return (
            <motion.div
              key={recipe.id}
              className="overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={`/${encodeURIComponent(category)}/${encodeURIComponent(
                  recipe.title
                )}`}
              >
                <Image
                  src={`/assets/thumbs/${recipe.thumbnail}`}
                  alt={recipe.title}
                  className="w-full h-[300px] object-cover rounded-lg mb-4 transition-transform duration-300"
                  width={500}
                  height={500}
                />
                <motion.h3
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {recipe.title}
                </motion.h3>
              </Link>
              <div className="flex items-center text-yellow-500 mb-2">
                <p className="mr-2">{recipe.rating.average_rating}</p>
                {/* Render stars dynamically */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill={
                      index < Math.round(recipe.rating.average_rating)
                        ? "currentColor"
                        : "none"
                    }
                    stroke="currentColor"
                    strokeWidth={
                      index < Math.round(recipe.rating.average_rating)
                        ? "0"
                        : "1.5"
                    }
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">{recipe.cooking_time}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
