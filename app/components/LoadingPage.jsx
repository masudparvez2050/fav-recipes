import { Loader2, Utensils, Apple, Coffee } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F4] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        {/* Animated plate */}
        <div className="w-24 h-24 rounded-full border-8 border-gray-200 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
        </div>
      </div>

      {/* Loading text with dots animation */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Preparing your recipes
        </h2>
        <p className="text-gray-600 flex items-center justify-center space-x-1">
          <span>Loading</span>
          <span className="inline-flex w-8">
            <span className="animate-bounce delay-100 mx-0.5">.</span>
            <span className="animate-bounce delay-200 mx-0.5">.</span>
            <span className="animate-bounce delay-300 mx-0.5">.</span>
          </span>
        </p>
      </div>

      {/* Animated cooking utensils and food icons */}
      <div className="flex items-center space-x-4 mt-8">
        <Apple className="w-8 h-8 text-red-500 animate-bounce" />
        <Utensils className="w-8 h-8 text-orange-500 animate-pulse" />
        <div className="w-2 h-16 bg-orange-400 rounded-full animate-[bounce_1s_ease-in-out_infinite]" />
        <div className="w-2 h-16 bg-orange-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_200ms]" />
        <div className="w-2 h-16 bg-orange-600 rounded-full animate-[bounce_1s_ease-in-out_infinite_400ms]" />
        <Coffee className="w-8 h-8 text-brown-600 animate-pulse" />
      </div>
    </div>
  );
}
