import Recipes from "/public/data/recipes.json";
import Categories from "/public/data/categories.json";
import Image from "next/image";
import Link from "next/link";

// console.log(Recipes);

export default function page({ params }) {
  const { recipe_title } = params;

  // Decode the URL-encoded title
  const decodedTitle = decodeURIComponent(recipe_title);

  // Find the recipe by title
  const recipe = Recipes.find((recipe) => recipe.title === decodedTitle);

  // console.log("Recipe Param: ", recipe_id);

  if (!recipe) {
    return (
      <div className=" h-[74vh] items-center flex flex-col justify-center text-4xl font-bold">
        <p>Ops!</p>

        <p>Recipe not found.</p>
      </div>
    );
  }

  // Find the category by recipe.category_id
  const category = Categories.find(
    (category) => category.id === recipe.category_id
  );

  // console.log(category);

  // Get top 4 popular recipes in the same category, excluding the current one
  // Get top 4 popular recipes in the same category, excluding the current one
  const categoryRecipes = Recipes.filter(
    (r) => r.category_id === recipe.category_id && r.title !== recipe.title
  )
    .sort((a, b) => b.rating.average_rating - a.rating.average_rating) // Sort by average rating (descending)
    .slice(0, 4); // Limit to top 4

  return (
    <main className="container mx-auto mt-[100px] px-4 py-8">
      <article>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{recipe.title}</h1>
        <div className="flex items-center space-x-4 mb-6">
          <Image
            src="/assets/avater.png"
            alt="Author"
            width={100}
            height={100}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-600">{recipe.author}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">{recipe.cooking_time}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">{recipe.published_date}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">Category: {category.name}</span>
        </div>
        <div className="flex items-center text-yellow-500  m-4">
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
                index < Math.round(recipe.rating.average_rating) ? "0" : "1.5"
              }
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Share
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              Save
            </button>
          </div>
        </div>
        <Image
          src={`/assets/thumbs/${recipe.thumbnail}`}
          alt={recipe.title}
          width={800}
          height={400}
          className="w-full h-auto mb-8 rounded-lg"
        />
        <p className="text-gray-600 mb-8">
          One thing I learned living in the Catskills section of Brooklyn, NY
          was how to cook a good Italian meal. Here is a recipe I created after
          having this dish in a restaurant. Enjoy!
        </p>
        <h2 className="text-3xl font-bold mb-4">Before you begin</h2>
        <p className="mb-8">
          Food qualities braise chicken cuts bowl through slices butternut
          snack. Tender meat juicy dinners. One-pot low heat plenty of time
          adobo fat raw soften fruit. sweet renders bone-in marrow richness
          kitchen, fricassee basted putter.
        </p>
        <h2 className="text-3xl font-bold mb-4">Here are the basics</h2>
        <p className="mb-8">
          Juicy meatballs brisket slammin&apos; baked shoulder. Juicy smoker soy
          sauce burgers brisket. polenta mustard hunk greens. Wine technique
          snack skewers chuck excess. Oil heat slowly. slices natural delicious,
          set aside magic tbsp skillet, bay leaves brown centerpiece. fruit
          soften edges frond slices onion snack pork steem on wines excess
          technique cup; Cover smoker soy sauce.
        </p>
        <blockquote className="text-3xl font-bold italic text-center my-12 px-4">
          &quot;One cannot think well, love well, sleep well, if one has not
          dined well.&quot;
        </blockquote>
        <p className="text-center text-gray-600 mb-12">
          — Virginia Woolf, A Room of One&apos;s Own
        </p>
        <h2 className="text-3xl font-bold mb-4">In the kitchen</h2>
        <p className="mb-8">
          Gastronomy atmosphere set aside. Slice butternut cooking home.
          Delicious romantic undisturbed raw platter will meld. Thick Skewers
          skillet natural, smoker soy sauce wait roux. slices rosette bone-in
          simmer. Romantic fall-off-the-bone butternut chuck under romas,
          Skewers on culinary experience.
        </p>
        <Image
          src={`/assets/thumbs/${recipe.thumbnail}`}
          alt="Cooking in kitchen"
          width={800}
          height={400}
          className="w-full h-auto mb-8 rounded-lg max-w-xl mx-auto"
        />
        <p className="mb-8">
          Juicy meatballs brisket slammin&apos; baked shoulder. Juicy smoker soy
          sauce burgers brisket. polenta mustard hunk greens. Wine technique
          snack skewers chuck excess. Oil heat slowly. slices natural delicious,
          set aside magic tbsp skillet, bay leaves brown centerpiece. fruit
          soften edges frond slices onion snack pork steem on wines excess
          technique cup; Cover smoker soy sauce.
        </p>
      </article>
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-8">You might also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 overflow-hidden">
          {categoryRecipes.map((recipe) => (
            <Link
              href={`/${encodeURIComponent(category.name)}/${encodeURIComponent(
                recipe.title
              )}`}
              key={recipe.id}
              className=" overflow-hidden border rounded-lg"
            >
              <Image
                src={`/assets/thumbs/${recipe.thumbnail}`}
                alt={recipe.title}
                width={500}
                height={500}
                className="w-full h-60 object-cover rounded-lg mb-2 transition-all duration-300 hover:scale-105"
              />
              <div className="flex items-center text-yellow-500  m-4">
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
              <h3 className="font-semibold ml-4 mb-4">{recipe.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
