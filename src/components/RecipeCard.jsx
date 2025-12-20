// src/components/RecipeCard.jsx
import React from 'react';

export default function RecipeCard({ recipe = {}, onOpen, onSave, onRegenerate }) {
  const { id, title, image, time, servings, tags = [] } = recipe;

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <div className="h-44 md:h-48 w-full bg-orange-100">
        {image ? (
          // plain <img> works universally; replace with next/image later if desired
          <img src={image} alt={title} className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 font-semibold">No image</div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2 text-gray-800">{title || 'Untitled recipe'}</h3>

        <div className="text-sm text-gray-600 flex items-center gap-3 mb-3">
          <span>{time ? `${time} min` : '—'}</span>
          <span>•</span>
          <span>{servings ? `${servings} servings` : '—'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {tags.slice(0, 3).map((t) => (
              <span key={t} className="text-xs bg-orange-100 px-2 py-1 rounded-full text-red-600 font-semibold">{t}</span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSave && onSave(recipe)}
              aria-label="Save recipe"
              title="Save"
              className="p-2 rounded-md hover:bg-orange-50"
            >
              🔖
            </button>

            <button
              onClick={() => onRegenerate && onRegenerate(recipe)}
              aria-label="Regenerate variant"
              title="Regenerate"
              className="p-2 rounded-md hover:bg-orange-50"
            >
              🔁
            </button>

            <button
              onClick={() => onOpen && onOpen(id)}
              className="ml-2 text-sm bg-linear-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-xl font-semibold shadow-md hover:shadow-lg"
            >
              Open
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
