import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    recipe: "",
    ingredients: "",
    steps: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const ingredientsArray = form.ingredients.split(",").map(ingredient => ingredient.trim());

    const newRecipe = {
      recipe: form.recipe,
      ingredients: ingredientsArray,  // Store ingredients as an array
      steps: form.steps.split(",").map(step => step.trim()),  // Similarly, ensure steps are an array
    };

    await fetch("https://ominous-space-sniffle-g45r5x6pqqvrfp97w-5050.app.github.dev/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .catch((error) => {
        window.alert(error);
        return;
      });

    setForm({ recipe: "", ingredients: "", steps: "" });
    navigate("/");
  }

  return (
    <div>
      <h3>Create New Recipe</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="recipe">Recipe</label>
          <input
            type="text"
            className="form-control"
            id="recipe"
            value={form.recipe}
            onChange={(e) => updateForm({ recipe: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (comma separated)</label>
          <input
            type="text"
            className="form-control"
            id="ingredients"
            value={form.ingredients}
            onChange={(e) => updateForm({ ingredients: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="steps">Steps (comma separated)</label>
          <input
            type="text"
            className="form-control"
            id="steps"
            value={form.steps}
            onChange={(e) => updateForm({ steps: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Create Recipe"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
