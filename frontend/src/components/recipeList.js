import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Recipe = (props) => {
  const { recipe } = props;
  
  // Convert ingredients and steps to list format if they are arrays
  const ingredientsList = Array.isArray(recipe.ingredients) ? (
    <ul>
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
    </ul>
  ) : (
    <p>{recipe.ingredients}</p>
  );

  const stepsList = Array.isArray(recipe.steps) ? (
    <ol>
      {recipe.steps.map((step, index) => (
        <li key={index}>{step}</li>
      ))}
    </ol>
  ) : (
    <p>{recipe.steps}</p>
  );

  return (
    <tr>
      <td>{recipe.recipe}</td>
      <td>{ingredientsList}</td>
      <td>{stepsList}</td>
      <td>
        <Link className="btn btn-link" to={`/recipe/${recipe._id}`}>
          View Recipe
        </Link>
        | 
        <Link className="btn btn-link" to={`/edit/${recipe._id}`}>
          Edit
        </Link>
        | 
        <button
          className="btn btn-link"
          onClick={() => props.deleteRecipe(recipe._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes once on mount
  useEffect(() => {
    async function getRecipes() {
      try {
        const response = await fetch(
          "https://ominous-space-sniffle-g45r5x6pqqvrfp97w-5050.app.github.dev/recipe"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        window.alert(error.message);
      }
    }
    getRecipes();
  }, []);

  // Delete recipe function
  async function deleteRecipes(id) {
    try {
      await fetch(
        `https://ominous-space-sniffle-g45r5x6pqqvrfp97w-5050.app.github.dev/recipe/${id}`,
        { method: "DELETE" }
      );
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      window.alert("Failed to delete recipe");
    }
  }

  return (
    <div>
      <h3>Recipe List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Recipe</th>
            <th>Ingredients</th>
            <th>Steps</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <Recipe
              recipe={recipe}
              deleteRecipe={deleteRecipes}
              key={recipe._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
