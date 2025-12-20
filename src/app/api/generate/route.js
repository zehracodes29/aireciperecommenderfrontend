import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Call your backend to generate the recipe
    const response = await fetch('http://localhost:5000/generate-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: prompt.split(',').map(i => i.trim()) }),
    });

    if (!response.ok) {
      throw new Error(`Backend failed: ${response.statusText}`);
    }

    const data = await response.json();

    // Parse the recipe text and return it in the expected format
    const recipeText = data.recipe || '';
    
    // Create a recipe object from the text
    const recipes = [{
      id: `recipe-${Date.now()}`,
      title: extractTitle(recipeText) || 'Generated Recipe',
      image: null,
      time: extractTime(recipeText),
      servings: extractServings(recipeText),
      tags: ['generated', 'ai'],
      ingredients: extractIngredients(recipeText),
      steps: extractSteps(recipeText),
      prompt: prompt,
      fullText: recipeText
    }];

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate recipe' },
      { status: 500 }
    );
  }
}

// Helper function to extract title
function extractTitle(text) {
  const match = text.match(/^#{1,3}\s+(.+?)$/m);
  return match ? match[1].trim() : null;
}

// Helper function to extract time
function extractTime(text) {
  const match = text.match(/(?:prep|cook|total)\s+time[:\s]+(\d+)\s*(?:min|hour)/i);
  return match ? `${match[1]} min` : null;
}

// Helper function to extract servings
function extractServings(text) {
  const match = text.match(/(?:yield|serving|serves?)[:\s]+([^0-9]*\d+[^0-9]*)/i);
  return match ? match[1].trim() : null;
}

// Helper function to extract ingredients
function extractIngredients(text) {
  const lines = text.split('\n');
  const ingredients = [];
  let inIngredients = false;

  for (let line of lines) {
    line = line.trim();
    
    if (line.toLowerCase().includes('ingredient')) {
      inIngredients = true;
      continue;
    }
    
    if (inIngredients && (line.toLowerCase().includes('instruction') || line.toLowerCase().includes('step') || line.toLowerCase().includes('direction'))) {
      break;
    }
    
    if (inIngredients && (line.startsWith('*') || line.startsWith('-') || /^\d+\./.test(line))) {
      ingredients.push(line.replace(/^[\*\-\d+\.]\s*/, '').trim());
    }
  }

  return ingredients.length > 0 ? ingredients : ['See full recipe for ingredients'];
}

// Helper function to extract steps
function extractSteps(text) {
  const lines = text.split('\n');
  const steps = [];
  let inSteps = false;

  for (let line of lines) {
    line = line.trim();
    
    if (line.toLowerCase().includes('instruction') || line.toLowerCase().includes('step') || line.toLowerCase().includes('direction')) {
      inSteps = true;
      continue;
    }
    
    if (inSteps && (line.startsWith('*') || line.startsWith('-') || /^\d+\./.test(line))) {
      steps.push(line.replace(/^[\*\-\d+\.]\s*/, '').trim());
    }
  }

  return steps.length > 0 ? steps : ['See full recipe for instructions'];
}
