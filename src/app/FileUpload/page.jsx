"use client";
import React, { useState } from "react";
import MarkdownPreview from '@uiw/react-markdown-preview';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!ingredients) {
      alert("Please enter ingredients!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/recipe-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredients.split(",").map(i => i.trim()) }),
      });

      const data = await res.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error("Gemini error:", error);
      alert("Error generating recipe!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">🍳 AI Recipe Generator</h1>
          <p className="text-lg text-gray-600">Upload files or enter ingredients to create amazing recipes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* File Upload Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-amber-200 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-2">📤</span> Upload Recipe File
            </h2>
            
            <div className="border-3 border-dashed border-amber-300 rounded-xl p-8 mb-6 text-center hover:border-amber-500 transition-colors cursor-pointer bg-amber-50">
              <input 
                type="file" 
                onChange={handleFileChange}
                className="hidden" 
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="text-5xl mb-2">📁</div>
                <p className="text-gray-700 font-semibold">
                  {file ? file.name : "Click or drag file here"}
                </p>
                <p className="text-gray-500 text-sm mt-1">Any file format supported</p>
              </label>
            </div>

            <button 
              onClick={handleUpload}
              className="w-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Upload File
            </button>

            {message && (
              <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${
                message.includes("successfully") 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Recipe Generator Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-rose-200 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-2">✨</span> Generate Recipe
            </h2>
            
            <textarea
              placeholder="Enter ingredients separated by commas&#10;Example: avocado, tomato, cheese"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={5}
              className="w-full p-4 border-2 border-rose-300 rounded-lg focus:border-rose-500 focus:outline-none resize-none font-medium text-gray-700 placeholder-gray-400"
            />

            <button 
              onClick={handleGenerateRecipe}
              disabled={loading}
              className="w-full mt-6 bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span> Generating...
                </span>
              ) : (
                "Generate Recipe ✨"
              )}
            </button>
          </div>
        </div>

        {/* Recipe Display Card */}
        {recipe && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border-2 border-amber-200 animate-fadeIn">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-4xl mr-2">🍽️</span> Your Generated Recipe
            </h3>
            <style>{`
              .recipe-content h1,
              .recipe-content h2,
              .recipe-content h3,
              .recipe-content h4,
              .recipe-content h5,
              .recipe-content h6 {
                color: #1f2937 !important;
                font-weight: 700 !important;
                margin-top: 1.5rem !important;
                margin-bottom: 1rem !important;
              }
              .recipe-content h1 { font-size: 1.875rem !important; }
              .recipe-content h2 { font-size: 1.5rem !important; }
              .recipe-content h3 { font-size: 1.25rem !important; }
              .recipe-content p {
                margin-bottom: 0.5rem !important;
                line-height: 1.8 !important;
                color: #374151 !important;
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
                color: #1f2937 !important;
              }
              .recipe-content em {
                font-style: italic !important;
              }
            `}</style>
            <div className="recipe-content bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 whitespace-pre-wrap">
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
        )}
      </div>
    </div>
  );
};

export default FileUpload;