"use client";
import React, { useState } from "react";
import MarkdownPreview from '@uiw/react-markdown-preview';
import Link from 'next/link';
import { Sparkles, Clock, Users, ChefHat, Heart, Share2, ArrowLeft } from 'lucide-react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [likedRecipes, setLikedRecipes] = useState({});

  const recommendedRecipes = [
    {
      id: 1,
      name: "Classic Margherita Pizza",
      time: "30 min",
      servings: 4,
      difficulty: "Easy",
      image: "🍕",
      color: "from-red-100 to-orange-100",
      borderColor: "border-red-300"
    },
    {
      id: 2,
      name: "Grilled Salmon",
      time: "25 min",
      servings: 2,
      difficulty: "Medium",
      image: "🐟",
      color: "from-blue-100 to-cyan-100",
      borderColor: "border-blue-300"
    },
    {
      id: 3,
      name: "Spicy Thai Curry",
      time: "35 min",
      servings: 6,
      difficulty: "Medium",
      image: "🍛",
      color: "from-yellow-100 to-orange-100",
      borderColor: "border-yellow-300"
    },
    {
      id: 4,
      name: "Caesar Salad",
      time: "15 min",
      servings: 2,
      difficulty: "Easy",
      image: "🥗",
      color: "from-green-100 to-emerald-100",
      borderColor: "border-green-300"
    },
    {
      id: 5,
      name: "Spaghetti Carbonara",
      time: "20 min",
      servings: 4,
      difficulty: "Easy",
      image: "🍝",
      color: "from-amber-100 to-yellow-100",
      borderColor: "border-amber-300"
    },
    {
      id: 6,
      name: "Chocolate Cake",
      time: "45 min",
      servings: 8,
      difficulty: "Hard",
      image: "🍰",
      color: "from-purple-100 to-pink-100",
      borderColor: "border-purple-300"
    }
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("myFile", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading file!");
    }
  };

  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient!");
      return;
    }

    setLoading(true);
    setError("");
    setRecipe("");
    
    try {
      const ingredientsList = ingredients.split(",").map(i => i.trim()).filter(i => i.length > 0);
      console.log("🍳 Sending ingredients:", ingredientsList);
      
      const res = await fetch("/api/recipe-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredientsList }),
      });

      console.log("📥 Response status:", res.status);
      const data = await res.json();
      console.log("📦 Response data:", data);

      if (!res.ok) {
        console.error("❌ API Error Response:", data);
        const errorMsg = data.error || data.message || `HTTP ${res.status}`;
        throw new Error(errorMsg);
      }

      if (data.recipe && data.recipe.trim().length > 0) {
        console.log("✅ Recipe generated successfully!");
        setRecipe(data.recipe);
      } else {
        console.error("⚠️ Empty recipe received:", data);
        setError("Recipe generated but appears to be empty. Please try again.");
      }
    } catch (error) {
      console.error("❌ Recipe generation error:", error);
      
      // Provide specific error messages
      if (error.message.includes("Failed to fetch")) {
        setError("Cannot connect to backend. Ensure backend is running on port 5000.");
      } else if (error.message.includes("GEMINI") || error.message.includes("API")) {
        setError("API configuration error. Check your Gemini API key.");
      } else if (error.message.includes("No recipe")) {
        setError("Backend didn't return a recipe. Check backend logs.");
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = (id) => {
    setLikedRecipes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50 to-amber-50">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="sticky z-10 px-6 py-6 border-b border-white/20 bg-white/30 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-linear-to-br from-orange-500 to-amber-500 p-2.5 rounded-xl shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-6">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  AI Recipe Finder
                </h1>
              </div>
            </div>
          </Link>
          
          <Link href="/">
            <button className="flex items-center gap-2 text-slate-600 hover:text-orange-600 transition-colors font-medium group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back Home
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800 mb-3 flex items-center justify-center gap-3">
              <Sparkles className="w-10 h-10 text-orange-500 animate-spin" />
              Create Your Recipe
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Enter your ingredients and let AI generate a delicious recipe for you
            </p>
          </div>

          {/* Recipe Generator Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Input Card */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="text-3xl">✨</span> Generate Recipe
                </h3>
                
                <textarea
                  placeholder="Enter ingredients separated by commas&#10;Example: chicken, tomato, garlic, basil, olive oil"
                  value={ingredients}
                  onChange={(e) => {
                    setIngredients(e.target.value);
                    setError("");
                  }}
                  rows={6}
                  className="w-full p-4 border-2 border-orange-200 rounded-2xl focus:border-orange-500 focus:outline-none resize-none font-medium text-gray-800 placeholder-gray-500 bg-white/50 focus:bg-white transition-all"
                />

                {error && (
                  <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2 animate-pulse">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <button 
                  onClick={handleGenerateRecipe}
                  disabled={loading || !ingredients.trim()}
                  className="w-full mt-6 bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed shadow-xl text-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating Recipe...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Generate Recipe ✨
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* File Upload Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="text-3xl">📤</span> Upload File
              </h3>
              
              <div className="border-3 border-dashed border-orange-400 rounded-2xl p-6 mb-6 text-center hover:border-orange-500 transition-colors cursor-pointer bg-orange-50 hover:bg-orange-100">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="hidden" 
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <div className="text-5xl mb-2">📁</div>
                  <p className="text-gray-700 font-semibold text-sm">
                    {file ? file.name : "Click to upload"}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">Any format</p>
                </label>
              </div>

              <button 
                onClick={handleUpload}
                className="w-full bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Upload
              </button>

              {message && (
                <div className={`mt-4 p-3 rounded-lg text-center font-semibold text-sm ${
                  message.includes("successfully") 
                    ? "bg-green-100 text-green-800 border border-green-300" 
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>

          {/* Generated Recipe Display */}
          {recipe && (
            <div className="mb-16 animate-fadeIn">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
                    <span className="text-4xl">🍽️</span> Your Generated Recipe
                  </h3>
                  <button className="text-orange-500 hover:text-red-500 transition-colors transform hover:scale-125">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
                
                <style>{`
                  .recipe-content h1,
                  .recipe-content h2,
                  .recipe-content h3,
                  .recipe-content h4,
                  .recipe-content h5,
                  .recipe-content h6 {
                    color: #c2410c !important;
                    font-weight: 700 !important;
                    margin-top: 1.5rem !important;
                    margin-bottom: 1rem !important;
                  }
                  .recipe-content h1 { font-size: 1.875rem !important; }
                  .recipe-content h2 { font-size: 1.5rem !important; }
                  .recipe-content h3 { font-size: 1.25rem !important; }
                  .recipe-content p {
                    margin-bottom: 0.75rem !important;
                    line-height: 1.8 !important;
                    color: #374151 !important;
                    font-size: 1rem !important;
                  }
                  .recipe-content ul,
                  .recipe-content ol {
                    margin-left: 1.5rem !important;
                    margin-bottom: 1rem !important;
                    margin-top: 0.5rem !important;
                  }
                  .recipe-content li {
                    margin-bottom: 0.75rem !important;
                    line-height: 1.8 !important;
                    color: #374151 !important;
                    padding-left: 0.5rem !important;
                  }
                  .recipe-content strong {
                    font-weight: 700 !important;
                    color: #b45309 !important;
                  }
                  .recipe-content em {
                    font-style: italic !important;
                  }
                `}</style>
                
                <div className="recipe-content bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-orange-200">
                  <MarkdownPreview 
                    source={recipe} 
                    style={{ 
                      padding: 0,
                      backgroundColor: "transparent",
                      color: "#333",
                      fontFamily: "inherit",
                      lineHeight: "1.6"
                    }} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Recommended Recipes Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-orange-500" />
                Recommended Recipes
              </h2>
              <p className="text-slate-600 text-lg">Explore popular recipes to inspire your cooking</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedRecipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="group bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-white/50 transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer animate-slideUp"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Recipe Image */}
                  <div className={`h-40 bg-linear-to-br ${recipe.color} flex items-center justify-center text-6xl group-hover:scale-110 transition-transform relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent"></div>
                    <span className="relative z-10 filter drop-shadow-lg">{recipe.image}</span>
                  </div>
                  
                  {/* Recipe Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <h3 className="text-lg font-bold text-slate-800 flex-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {recipe.name}
                      </h3>
                      <button 
                        onClick={() => toggleLike(recipe.id)}
                        className="text-slate-400 hover:text-red-500 transition-all transform hover:scale-125 active:scale-110 shrink-0"
                      >
                        <Heart className={`w-5 h-5 ${likedRecipes[recipe.id] ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-slate-600 mb-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span>{recipe.servings}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-orange-100">
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                        {recipe.difficulty}
                      </span>
                      <button className="text-orange-600 hover:text-orange-700 font-medium text-sm hover:underline transition-colors">
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FileUpload;

