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

    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setRecipes([]); // show skeletons / indicate loading

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
        return;
      }
      console.error('Generate error', err);
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
    try {
      const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
      if (!saved.find((r) => r.id === recipe.id)) {
        saved.unshift(recipe);
        localStorage.setItem('savedRecipes', JSON.stringify(saved));
        toast('Saved to device. Sign in to sync across devices.');
      } else {
        toast('Already saved');
      }
    } catch (e) {
      console.error('Save error', e);
      toast('Could not save recipe locally.');
    }
  }

  async function handleRegenerate(recipe) {
    await generate(lastPrompt || recipe.prompt || '');
  }

  // tiny toast fallback (non-blocking)
  function toast(msg) {
    const el = document.createElement('div');
    el.innerText = msg;
    el.className =
      'fixed bottom-6 right-6 z-50 rounded-md px-4 py-2 shadow-lg bg-white border text-sm';
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
    }, 2200);
    setTimeout(() => document.body.removeChild(el), 2800);
  }

  return (
    //i want to style the page into mint green and light colors
    <main className="min-h-screen bg-linear-to-br from-emerald-400 via-teal-400 to-cyan-500 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div
              aria-hidden
              className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-xl shadow-2xl"
            >
              A
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg leading-tight">
                AI Recipe Recommender
              </h1>
              <p className="text-sm text-white drop-shadow-md mt-1">
                Fresh recipe ideas tailored to what you have and how you want to cook.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => (window.location.href = '/FileUpload')}
              className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg shadow-lg hover:scale-[1.02] transition-transform font-semibold"
              title="Upload files / images to guide generation"
            >
              Get Started
              <svg className="w-4 h-4 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              className="px-3 py-2 rounded-lg hover:bg-white/80 transition text-sm border border-white bg-white/70 backdrop-blur font-semibold text-emerald-600"
              onClick={() => toast('Sign-in not yet implemented in demo')}
            >
              Sign in
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="rounded-2xl p-6 md:p-10 mb-8 relative overflow-hidden shadow-xl bg-white/80 backdrop-blur-sm">
          {/* decorative gradients */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-16 w-80 h-80 rounded-full blur-3xl opacity-70 bg-linear-to-tr from-[#9ad406] to-[#1ed406] animate-slow-float"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -bottom-8 w-64 h-64 rounded-full blur-2xl opacity-60 bg-linear-to-br from-[#9ad406] to-[#1ed406] animate-slow-float animation-delay-2500"
          />

          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0f172a] mb-2">
              Discover recipes you'll love
            </h2>
            <p className="text-sm text-[#334155] mb-6">
              Type ingredients, dietary preferences or a goal (e.g., "high-protein vegan dinner") and hit Generate.
            </p>

            <div className="space-y-4">
              <HeroSearch
                onGenerate={generate}
                examples={[
                  'Vegan 20-min dinner for 2',
                  'Chicken + broccoli — low-carb dinner',
                  'Gluten-free breakfast with oats',
                ]}
              />

              {/* progress bar */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#475569]">
                  {loading ? 'Generating suggestions…' : 'Ready to generate'}
                </div>

                <div
                  aria-hidden={!loading}
                  className={`w-40 h-2 rounded-full bg-[#e6eef6] overflow-hidden ${loading ? 'shadow-inner' : ''}`}
                >
                  <div
                    className={`h-2 rounded-full transform transition-all ${loading ? 'w-full animate-loading-bar' : 'w-0'}`}
                    style={{ background: 'linear-gradient(90deg,#ff6b6b,#f59e0b,#06b6d4)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARIA live region */}
        <div aria-live="polite" className="sr-only" ref={resultsAnnounceRef} />

        {/* Results */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#0f172a]">
              {loading ? 'Generating recipes…' : recipes.length ? 'Results' : 'Try a prompt to generate recipes'}
            </h3>

            {lastPrompt && (
              <div className="text-sm text-[#475569] truncate max-w-xs">
                Last prompt:&nbsp;
                <span className="font-medium text-[#0f172a]">{lastPrompt}</span>
              </div>
            )}
          </div>

          <RecipeGrid
            recipes={recipes}
            loading={loading}
            onOpen={(id) => {
              const r = recipes.find((x) => x.id === id);
              if (r) {
                const bodyLines = [
                  `Title: ${r.title || '—'}`,
                  '',
                  'Ingredients:',
                  ...(r.ingredients || []),
                  '',
                  'Steps:',
                  ...(r.steps || []),
                ];
                alert(bodyLines.join('\n'));
              }
            }}
            onSave={handleSave}
            onRegenerate={handleRegenerate}
          />
        </section>

        {/* Footer */}
        <footer className="pt-6 border-t border-[#e6eef6]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#475569]">
              Built with ❤ — try prompts like "quick dinner for 1" or "high protein lunch".
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
                  if (!saved.length) {
                    toast('No saved recipes on this device yet.');
                    return;
                  }
                  toast(`Saved: ${saved.slice(0, 3).map((s) => s.title).join(', ')}`);
                }}
                className="text-sm px-3 py-1 rounded-md bg-white border hover:shadow transition"
              >
                View saved (local)
              </button>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toast('Help: Enter ingredients or choose an example and click "Generate".');
                }}
                className="text-sm text-[#475569] hover:underline"
              >
                Help
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* local styles for demo — move to globals.css for production */}
      <style>{`
        @keyframes slowFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-slow-float { animation: slowFloat 9s ease-in-out infinite; }
        .animation-delay-2500 { animation-delay: 2.5s; }

        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-20%); }
          100% { transform: translateX(0%); }
        }
        .animate-loading-bar { animation: loadingBar 1.2s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-slow-float, .animate-loading-bar { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
