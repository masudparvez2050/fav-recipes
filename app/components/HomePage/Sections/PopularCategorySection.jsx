"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Recipes from "/public/data/recipes.json";
import Categories from "/public/data/categories.json";

// ******Get top 6 popular categories functions*********
// Get the top `topCount` popular categories
const getPopularCategories = (recipes, categories, topCount = 6) => {
  const categoryCounts = recipes.reduce((counts, { category_id }) => {
    counts[category_id] = (counts[category_id] || 0) + 1;
    return counts;
  }, {});

  return Object.entries(categoryCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, topCount)
    .map(([categoryId, count]) => ({
      ...categories.find((cat) => cat.id === categoryId),
    }))
    .filter(Boolean); // Remove unmatched categories
};

const popularCategories = getPopularCategories(Recipes, Categories, 6);
// console.log("Popular Categories:", popularCategories);

export default function PopularCategorySection() {
  return (
    <section className="mb-16">
      <motion.div
        className="flex justify-between items-top"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
        <Link href="/categories" className="text-orange-500">
          View All
        </Link>
      </motion.div>
      <motion.div
        className="grid grid-cols-3 md:grid-cols-6 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2, // Stagger child animations
            },
          },
        }}
      >
        {popularCategories.map((category) => (
          <motion.div
            key={category.id}
            className="cursor-pointer text-center group"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link href={`/${category.name}`}>
              <motion.div
                className="overflow-hidden rounded-full mb-2 w-20 h-20 mx-auto"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={`/assets${category.image}`}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                  width={50}
                  height={50}
                />
              </motion.div>
              <motion.p
                className="transition-transform duration-300 group-hover:scale-105"
                whileHover={{ scale: 1.1 }}
              >
                {category.name}
              </motion.p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
