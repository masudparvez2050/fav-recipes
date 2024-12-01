"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Recipes from "/public/data/recipes.json";
import Categories from "/public/data/categories.json";

// ************Get Latest Recipes for Latest Recipes Section*************
const getLatestRecipes = (recipes, count = 4) => {
  return [...recipes]
    .sort((a, b) => new Date(b.published_date) - new Date(a.published_date)) // Sort by latest date
    .slice(0, count); // Get the top `count` recipes
};

const latestRecipes = getLatestRecipes(Recipes, 4);

// Function to get the category name by category_id
const getCategoryName = (categoryId) => {
  const category = Categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "Unknown Category"; // Return the category name or default if not found
};

// console.log("Latest Recipes:", latestRecipes);

export default function LatestRecipesSection() {
  return (
    <motion.section
      id="latest-recipes"
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Latest Recipes
      </motion.h2>
      <motion.div
        className="grid md:grid-cols-4 gap-8 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {latestRecipes.map((recipe) => {
          const categoryName = getCategoryName(recipe.category_id);
          return (
            <motion.div
              key={recipe.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href={`/${encodeURIComponent(
                  categoryName
                )}/${encodeURIComponent(recipe.title)}`}
                className="rounded-lg block group"
              >
                <Image
                  src={`/assets/thumbs/${recipe.thumbnail}`}
                  alt={recipe.title}
                  width={500}
                  height={500}
                  className="w-full h-[300px] object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                <p className="text-gray-600">{categoryName}</p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
