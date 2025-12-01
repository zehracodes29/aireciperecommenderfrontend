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
    formData.append("myFile", file); // must match Multer field name

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
      const res = await fetch("http://localhost:5000/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredients.split(",") }),
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
    
    

    <div className="background-yellow-200 min-h-screen flex items-center justify-center">
    <div style={styles.container}>
      <h2 className="title text-3xl text-gray-800 ">🍳 AI Recipe Generator</h2>

      {/* File upload section */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>

      <hr style={{ margin: "30px 0" }} />

      {/* Gemini recipe generator */}
      <textarea
        placeholder="Enter ingredients separated by commas (e.g. avocado,tomato,cheese)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        rows={3}
        style={{ width: "100%" }}
      />

      <button className="rounded-lg bg-black text-amber-100" onClick={handleGenerateRecipe} disabled={loading}>
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {recipe && (
        <div style={{ marginTop: 20 }}>
          <h3>Generated Recipe:</h3>
           <MarkdownPreview source={recipe} style={{ padding: 16 }} />
          <pre style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>
            
          </pre>
        </div>
      )}
    </div>
    </div>
  );
};

const styles = {
  container: {
    margin: "50px auto",
    textAlign: "center",
    maxWidth: "600px",
    fontFamily: "sans-serif",
  },
};

export default FileUpload;