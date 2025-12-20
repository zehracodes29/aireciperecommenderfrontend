import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { ingredients } = await request.json();

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Ingredients array is required' },
        { status: 400 }
      );
    }

    // Call your backend to generate the recipe
    const response = await fetch('http://localhost:5000/generate-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
      throw new Error(`Backend failed: ${response.statusText}`);
    }

    const data = await response.json();

    // Return the recipe directly
    return NextResponse.json({ recipe: data.recipe });
  } catch (error) {
    console.error('Recipe API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate recipe' },
      { status: 500 }
    );
  }
}
