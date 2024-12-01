import Recipes from "/public/data/recipes.json";
import Categories from "/public/data/categories.json";
import Link from "next/link";
import Image from "next/image";

export default function page({ params }) {
  const { category } = params;

  // Find the category by ID
  const categoryName = Categories.find((cat) => cat.name === category);

  // Filter recipes that belong to this category
  const categoryRecipes = Recipes.filter(
    (recipe) => recipe.category_id === categoryName.id
  );

  // console.log("Recipe by Category : ", categoryRecipes);

  // If no category is found, handle gracefully
  if (!categoryName) {
    return (
      <main className="container mx-auto px-4 py-8 mt-[100px]">
        <h1 className="text-4xl font-bold">Category Not Found</h1>
        <p className="text-gray-600">
          We couldn&apos;t find the category you&apos;re looking for.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 mt-[100px] h-auto">
      {/* Category Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {categoryName.name}{" "}
            <span className="text-gray-500 text-2xl font-normal">
              ({categoryRecipes.length}{" "}
              {categoryRecipes.length > 1 ? "Recipes" : "Recipe"})
            </span>
          </h1>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categoryRecipes.map((recipe) => (
          <Link
            href={`/${categoryName.name}/${recipe.title}`}
            key={recipe.id}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src={`/assets/thumbs/${recipe.thumbnail}`}
              alt={recipe.title}
              width={500}
              height={500}
              className="w-full h-48 object-cover transition-all duration-300 hover:scale-110"
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
            <div className="pb-4 px-4">
              <h2 className="font-semibold text-lg mb-2">{recipe.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
