"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Recipes from "/public/data/recipes.json";
import Categories from "/public/data/categories.json";

// ***********Best Rated Recipe for Hero**************
const bestRatedRecipe = Recipes.reduce((best, recipe) => {
  return recipe.rating.average_rating > best.rating.average_rating
    ? recipe
    : best;
}, Recipes[0]);
// console.log("Best Rated Recipe:", bestRatedRecipe);

// Find the category of the best-rated recipe
const bestRatedCategory = Categories.find(
  (category) => category.id === bestRatedRecipe.category_id
);

console.log("Best Rated Recipe Category:", bestRatedCategory);

export default function HeroSection() {
  return (
    <section className="mb-16 bg-orange-50 overflow-hidden">
      <motion.div
        className="grid md:grid-cols-2 gap-8 items-center overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Hero Image */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Image
            src={`/assets/thumbs/${bestRatedRecipe.thumbnail}`}
            alt={bestRatedRecipe.title}
            width={500}
            height={500}
            className="w-full h-[450px] object-cover rounded-lg"
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold mb-4">{bestRatedRecipe.title}</h1>
          <p className="text-gray-600 mb-4">{bestRatedRecipe.description}</p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href={`/${bestRatedCategory.name}/${bestRatedRecipe.title}`}
              className="bg-orange-500 text-white px-6 py-2 rounded-full inline-block hover:bg-orange-600"
            >
              View Recipe
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
