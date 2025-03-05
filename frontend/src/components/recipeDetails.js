import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(`https://ominous-space-sniffle-g45r5x6pqqvrfp97w-5050.app.github.dev/recipe/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe with id: ${id}`);
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        window.alert(`Error fetching recipe: ${error.message}`);
      }
    }

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h3>{recipe.recipe}</h3>
      
      <h4>Ingredients:</h4>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h4>Steps:</h4>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Back to Recipe List
      </button>
    </div>
  );
}