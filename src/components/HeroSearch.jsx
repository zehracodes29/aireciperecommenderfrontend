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
          className="w-full px-4 py-3 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-brand-500 focus:outline-none
                     shadow-sm text-gray-800"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white font-semibold shadow 
            transition bg-brand-500 hover:bg-brand-700 disabled:opacity-50`}
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
              className="px-3 py-1 bg-white/80 text-gray-700 rounded-full 
                         border hover:bg-white shadow-sm text-sm"
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
