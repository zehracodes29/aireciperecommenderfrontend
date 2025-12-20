'use client';

import { useState } from 'react';

export default function HeroSearch({ onGenerate, examples = [] }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      await onGenerate(prompt);
    } finally {
      setLoading(false);
    }
  }

  function useExample(example) {
    setPrompt(example);
    onGenerate(example);
  }

  return (
    <div className="w-full">
      {/* Input Section */}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Describe the recipe you want…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-orange-300 
                     focus:ring-2 focus:ring-red-500 focus:outline-none
                     shadow-sm text-gray-800 bg-white placeholder-gray-500"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white font-semibold shadow-lg
            transition bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:opacity-50`}
        >
          {loading ? 'Generating…' : 'Generate Recipe'}
        </button>
      </div>

      {/* Example Chips */}
      {examples.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {examples.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => useExample(ex)}
              className="px-3 py-1 bg-white text-red-600 rounded-full 
                         border-2 border-orange-300 hover:bg-orange-50 shadow-md text-sm font-semibold"
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
