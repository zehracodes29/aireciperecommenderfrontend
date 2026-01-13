// 'use client';
// 
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Search, ChefHat, Sparkles, Clock, Users, Flame, Heart, ArrowLeft } from 'lucide-react';
// 
// export default function RecipeGeneratePage() {
//   const [ingredients, setIngredients] = useState('');
//   const [preferences, setPreferences] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showResults, setShowResults] = useState(false);
// 
//   const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Low-Carb', 'Dairy-Free'];
//   
//   const sampleRecipes = [
//     {
//       name: "Mediterranean Quinoa Bowl",
//       time: "25 min",
//       servings: 4,
//       difficulty: "Easy",
//       image: "🥗"
//     },
//     {
//       name: "Spicy Thai Curry",
//       time: "35 min",
//       servings: 6,
//       difficulty: "Medium",
//       image: "🍛"
//     },
//     {
//       name: "Classic Margherita Pizza",
//       time: "45 min",
//       servings: 4,
//       difficulty: "Medium",
//       image: "🍕"
//     },
//     {
//       name: "Grilled Salmon with Veggies",
//       time: "30 min",
//       servings: 2,
//       difficulty: "Easy",
//       image: "🐟"
//     },
//     {
//       name: "Creamy Pasta Carbonara",
//       time: "20 min",
//       servings: 4,
//       difficulty: "Easy",
//       image: "🍝"
//     },
//     {
//       name: "Mexican Burrito Bowl",
//       time: "35 min",
//       servings: 6,
//       difficulty: "Medium",
//       image: "🌯"
//     }
//   ];
// 
//   const togglePreference = (pref) => {
//     setPreferences(prev => 
//       prev.includes(pref) 
//         ? prev.filter(p => p !== pref)
//         : [...prev, pref]
//     );
//   };
// 
//   const handleSearch = async () => {
//     setIsSearching(true);
//     
//     // TODO: Replace with your actual backend API call
//     // Example:
//     // try {
//     //   const response = await fetch('YOUR_BACKEND_URL/api/recipes', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({ ingredients, preferences })
//     //   });
//     //   const data = await response.json();
//     //   // Set your recipes state here
//     // } catch (error) {
//     //   console.error('Error fetching recipes:', error);
//     // }
//     
//     // Simulating API call with timeout (REMOVE THIS WHEN ADDING REAL API)
//     setTimeout(() => {
//       setIsSearching(false);
//       setShowResults(true);
//     }, 2000);
//   };
// 
//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50 to-amber-50">
//       {/* Animated background blobs */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
//         <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
//       </div>
// 
//       {/* Header */}
//       <header className="relative z-10 px-6 py-6 border-b border-white/20 bg-white/30 backdrop-blur-md">
//         <div className="max-w-6xl mx-auto flex items-center justify-between">
//           <Link href="/">
//             <div className="flex items-center gap-3 group cursor-pointer">
//               <div className="bg-linear-to-br from-orange-500 to-amber-500 p-2.5 rounded-xl shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-6">
//                 <ChefHat className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
//                   AI Recipe Finder
//                 </h1>
//               </div>
//             </div>
//           </Link>
//           
//           <Link href="/">
//             <button className="flex items-center gap-2 text-slate-600 hover:text-orange-600 transition-colors font-medium">
//               <ArrowLeft className="w-4 h-4" />
//               Back to Home
//             </button>
//           </Link>
//         </div>
//       </header>
// 
//       {/* Main Content */}
//       <main className="relative z-10 px-6 py-12">
//         <div className="max-w-6xl mx-auto">
//           
//           {/* Page Title */}
//           <div className="text-center mb-10">
//             <h2 className="text-4xl font-bold text-slate-800 mb-3 flex items-center justify-center gap-3">
//               <Sparkles className="w-8 h-8 text-orange-500" />
//               Find Your Perfect Recipe
//             </h2>
//             <p className="text-slate-600 text-lg">
//               Tell us what you have, and we'll suggest amazing recipes
//             </p>
//           </div>
// 
//           {/* Search Section */}
//           <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-10 border border-white/50 transform transition-all hover:shadow-2xl">
//             <label className="block text-sm font-semibold text-slate-700 mb-3">
//               What ingredients do you have? 🥕
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={ingredients}
//                 onChange={(e) => setIngredients(e.target.value)}
//                 placeholder="e.g., chicken, tomatoes, pasta, garlic, basil..."
//                 className="w-full px-6 py-4 pr-14 bg-white border-2 border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
//               />
//               <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//             </div>
// 
//             {/* Dietary Preferences */}
//             <div className="mt-6">
//               <label className="block text-sm font-semibold text-slate-700 mb-3">
//                 Dietary Preferences (Optional) 🥗
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {dietaryOptions.map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => togglePreference(option)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
//                       preferences.includes(option)
//                         ? 'bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-lg'
//                         : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-orange-300'
//                     }`}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             </div>
// 
//             {/* Search Button */}
//             <button
//               onClick={handleSearch}
//               disabled={isSearching || !ingredients.trim()}
//               className="mt-6 w-full bg-linear-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {isSearching ? (
//                 <>
//                   <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Finding perfect recipes...
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="w-5 h-5" />
//                   Discover Recipes
//                 </>
//               )}
//             </button>
//           </div>
// 
//           {/* Results Section */}
//           {showResults && (
//             <div className="space-y-6 animate-fadeIn">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
//                   <Flame className="w-7 h-7 text-orange-500" />
//                   Recommended for You
//                 </h2>
//                 <span className="text-slate-600 text-sm">
//                   {sampleRecipes.length} recipes found
//                 </span>
//               </div>
//               
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {sampleRecipes.map((recipe, index) => (
//                   <div
//                     key={index}
//                     className="group bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-white/50 transform transition-all hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
//                     style={{
//                       animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
//                     }}
//                   >
//                     {/* Recipe Image */}
//                     <div className="h-48 bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform relative overflow-hidden">
//                       <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
//                       <span className="relative z-10">{recipe.image}</span>
//                     </div>
//                     
//                     {/* Recipe Info */}
//                     <div className="p-5">
//                       <div className="flex items-start justify-between mb-3">
//                         <h3 className="text-lg font-bold text-slate-800 flex-1 group-hover:text-orange-600 transition-colors">
//                           {recipe.name}
//                         </h3>
//                         <button className="text-slate-400 hover:text-red-500 transition-colors transform hover:scale-125 active:scale-110">
//                           <Heart className="w-5 h-5" />
//                         </button>
//                       </div>
//                       
//                       <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-4 h-4 text-orange-500" />
//                           <span>{recipe.time}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Users className="w-4 h-4 text-orange-500" />
//                           <span>{recipe.servings} servings</span>
//                         </div>
//                       </div>
//                       
//                       <div className="flex items-center justify-between">
//                         <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
//                           {recipe.difficulty}
//                         </span>
//                         <button className="text-orange-600 hover:text-orange-700 font-medium text-sm hover:underline">
//                           View Recipe →
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
// 
//           {/* Empty State */}
//           {!showResults && !isSearching && (
//             <div className="text-center py-16 opacity-60">
//               <ChefHat className="w-20 h-20 text-slate-300 mx-auto mb-4" />
//               <p className="text-slate-500 text-lg">
//                 Enter your ingredients above to get started
//               </p>
//             </div>
//           )}
//         </div>
//       </main>
// 
//       <style jsx>{`
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
// 
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
// 
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

import { NextResponse } from 'next/server';