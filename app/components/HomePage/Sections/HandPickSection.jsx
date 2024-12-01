"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Recipes from "/public/data/recipes.json";
import Categories from "/public/data/categories.json";

// *************Get  Recipes for Hand-Picke Collection*********
const getSpecificRecipes = (recipes, indexes) => {
  return indexes
    .map((index) => recipes[index]) // Get recipes at the specified indexes
    .filter(Boolean); // Remove undefined if an index doesn't exist
};

const handPickRecipes = getSpecificRecipes(Recipes, [10, 20]);

// console.log("Recipes at Indexes 10 and 20:", handPickRecipes);

export default function HandPickSection() {
  return (
    <motion.section
      id="hand-picked"
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 animate-fade-in-down"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Hand-Picked Collections
      </motion.h2>
      <motion.div
        className="grid md:grid-cols-2 gap-8"
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
        {handPickRecipes.map((recipe) => {
          // Find the category for the current recipe
          const category = Categories.find(
            (cat) => cat.id === recipe.category_id
          )?.name;
          return (
            <Link
              href={`/${encodeURIComponent(category)}/${encodeURIComponent(
                recipe.title
              )}`}
              key={recipe.category_id}
              className="relative group overflow-hidden rounded-lg transition-transform duration-300 ease-in-out transform cursor-pointer"
            >
              <Image
                src={`/assets/thumbs/${recipe.thumbnail}`}
                alt="Sushi Combos"
                width={1000}
                height={1000}
                className="w-full h-[400px] rounded-lg object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg transition-all duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0">
                <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                <div className="text-orange-300 hover:underline">
                  View Collection
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
