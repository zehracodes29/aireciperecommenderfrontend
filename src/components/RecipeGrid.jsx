// src/components/RecipeGrid.jsx
import React from 'react';
import RecipeCard from './RecipeCard';

export default function RecipeGrid({ recipes = [], loading = false, onOpen, onSave, onRegenerate }) {
  // show 6 skeletons while loading and no results yet
  if (loading && recipes.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-0 overflow-hidden">
            <div className="h-44 skeleton" />
            <div className="p-4">
              <div className="h-4 w-3/4 skeleton mb-3 rounded" />
              <div className="h-3 w-1/3 skeleton mb-3 rounded" />
              <div className="flex gap-2">
                <div className="h-7 w-20 skeleton rounded-full" />
                <div className="h-7 w-20 skeleton rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onOpen={onOpen} onSave={onSave} onRegenerate={onRegenerate} />
      ))}

      {(!loading && recipes.length === 0) && (
        <div className="col-span-full p-8 bg-white rounded-xl text-center text-slate-600">
          No recipes yet — try the prompt above or use an example.
        </div>
      )}
    </div>
  );
}
