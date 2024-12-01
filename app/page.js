"use client";

import HeroSection from "./components/HomePage/Sections/HeroSection";
import SuperDeliciousSection from "./components/HomePage/Sections/SuperDeliciousSection";
import PopularCategorySection from "./components/HomePage/Sections/PopularCategorySection";
import ContactSection from "./components/HomePage/Sections/ContactSection";
import HandPickSection from "./components/HomePage/Sections/HandPickSection";
import LatestRecipesSection from "./components/HomePage/Sections/LatestRecipesSection";

export default function Home() {
  
  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 mt-[100px]">
        {/* Hero section */}
        <HeroSection />

        {/* Super Delicious Section */}
        <SuperDeliciousSection />

        {/* Populer Category Section */}
        <PopularCategorySection />

        {/* Contact Section */}
        <ContactSection />

        {/* Hand-Picked Collections */}
        <HandPickSection />

        {/* Latest Recipes Section */}
        <LatestRecipesSection />
      </main>
    </div>
  );
}
