import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   recipe: "",
   ingredients: "",
   steps: "",
   recipes: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`https://ominous-space-sniffle-g45r5x6pqqvrfp97w-5050.app.github.dev/recipe/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const recipe = await response.json();
     if (!recipe) {
       window.alert(`Recipe with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(recipe);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedRecipe = {
     recipe: form.recipe,
     ingredients: form.ingredients,
     steps: form.steps,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`https://ominous-space-sniffle-g45r5x6pqqvrfp97w-5050.app.github.dev/recipe/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedRecipe),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Recipe</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="recipe">Recipe: </label>
         <input
           type="text"
           className="form-control"
           id="recipe"
           value={form.recipe}
           onChange={(e) => updateForm({ recipe: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="ingredients">Ingredients: </label>
         <input
           type="text"
           className="form-control"
           id="ingredients"
           value={form.ingredients}
           onChange={(e) => updateForm({ ingredients: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="steps">Steps: </label>
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
           value="Update Recipe"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}