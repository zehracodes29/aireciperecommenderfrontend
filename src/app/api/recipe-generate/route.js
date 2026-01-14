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

    console.log('📤 Forwarding request to backend:', ingredients);

    // Call your backend to generate the recipe
    const response = await fetch('http://localhost:5000/generate-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
    });

    console.log('📥 Backend response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error response:', errorText);
      throw new Error(`Backend failed: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Recipe received from backend');

    if (!data.recipe) {
      console.error('No recipe in response:', data);
      return NextResponse.json(
        { error: 'No recipe received from backend' },
        { status: 500 }
      );
    }

    // Return the recipe directly
    return NextResponse.json({ recipe: data.recipe });
  } catch (error) {
    console.error('❌ Recipe API error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to generate recipe' },
      { status: 500 }
    );
  }
}
