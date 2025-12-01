// src/app/page.js
'use client';

import React, { useState, useRef, useEffect } from 'react';
import HeroSearch from '../components/HeroSearch';
import RecipeGrid from '../components/RecipeGrid';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState('');
  const controllerRef = useRef(null);
  const resultsAnnounceRef = useRef(null);

  useEffect(() => {
    if (resultsAnnounceRef.current) {
      resultsAnnounceRef.current.textContent = recipes.length
        ? `${recipes.length} recipes generated`
        : 'No recipes';
    }
  }, [recipes]);

  async function generate(prompt) {
    if (!prompt || !prompt.trim()) return;
    setLastPrompt(prompt);

    // Abort any in-flight request
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setRecipes([]); // show skeletons

    try {
      const resp = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err?.error || `Request failed: ${resp.status}`);
      }

      const data = await resp.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      if (err.name === 'AbortError') {
        // request was aborted - do nothing
        return;
      }
      console.error('Generate error', err);
      // Show an error "card" so user has visible feedback
      setRecipes([
        {
          id: 'error',
          title: `Error generating recipes: ${err.message}`,
          image: null,
          time: null,
          servings: null,
          tags: ['error'],
          ingredients: [],
          steps: [],
        },
      ]);
    } finally {
      setLoading(false);
      controllerRef.current = null;
    }
  }

  function handleSave(recipe) {
    // simple localStorage save (guest fallback)
    try {
      const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
      if (!saved.find((r) => r.id === recipe.id)) {
        saved.unshift(recipe);
        localStorage.setItem('savedRecipes', JSON.stringify(saved));
        // simple feedback — replace later with toasts
        alert('Saved to device. Sign in to sync across devices.');
      } else {
        alert('Already saved');
      }
    } catch (e) {
      console.error('Save error', e);
      alert('Could not save recipe locally.');
    }
  }

  async function handleRegenerate(recipe) {
    // Regenerate using last prompt (or recipe.prompt if available)
    await generate(lastPrompt || recipe.prompt || '');
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Top area: logo + original welcome + sign in */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-linear-to-br from-brand-500 to-brand-300 flex items-center justify-center text-white font-bold text-lg">A</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">AI Recipe Recommender</h1>
              <p className="text-sm text-gray-600">Discover new recipes tailored to your preferences.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.href = '/FileUpload'}
              className="text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:opacity-95 transition"
            >
              Get Started
            </button>
            <button className="text-sm px-3 py-2 rounded-md hover:bg-gray-100">Sign in</button>
          </div>
        </header>

        {/* Intro / hero area (keeps your welcome text integrated) */}
        <section className="rounded-xl p-6 md:p-10 mb-8 hero-gradient">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">Welcome to the Recipe Recommender</h2>
            <p className="text-sm text-white/90 mb-6">
              Discover new recipes tailored to your preferences — type ingredients, dietary hints, or a cooking goal and press Generate.
            </p>

            {/* HeroSearch component (large prompt input + examples) */}
            <HeroSearch
              onGenerate={generate}
              examples={[
                'Vegan 20-min dinner for 2',
                'Chicken + broccoli — low-carb dinner',
                'Gluten-free breakfast with oats',
              ]}
            />
          </div>
        </section>

        {/* ARIA live region for screen readers */}
        <div aria-live="polite" className="sr-only" ref={resultsAnnounceRef} />

        {/* Results */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{loading ? 'Generating recipes…' : (recipes.length ? 'Results' : 'Try a prompt to generate recipes')}</h3>
            {lastPrompt && <div className="text-sm text-gray-500">Last prompt: <span className="font-medium text-gray-700">{lastPrompt}</span></div>}
          </div>

          <RecipeGrid
            recipes={recipes}
            loading={loading}
            onOpen={(id) => {
              const r = recipes.find((x) => x.id === id);
              if (r) {
                // basic modal/alert for demo — replace with actual modal/page in future
                alert(`${r.title}\n\nIngredients:\n${(r.ingredients || []).join('\n')}\n\nSteps:\n${(r.steps || []).join('\n\n')}`);
              }
            }}
            onSave={handleSave}
            onRegenerate={handleRegenerate}
          />
        </section>

        {/* Footer / saved recipes quick access */}
        <footer className="pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Built with ❤ — try prompts like "quick dinner for 1" or "high protein lunch".</p>
            <button
              onClick={() => {
                const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
                if (!saved.length) {
                  alert('No saved recipes on this device yet.');
                  return;
                }
                // show titles quickly
                alert('Saved recipes:\n\n' + saved.map((s) => `- ${s.title}`).join('\n'));
              }}
              className="text-sm px-3 py-1 rounded-md bg-white border hover:bg-gray-50"
            >
              View saved (local)
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
