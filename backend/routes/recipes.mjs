import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the recipes.
router.get("/", async (req, res) => {
  let collection = await db.collection("recipes");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single recipe by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("recipes");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new recipe.
router.post('/', async (req, res) => {
    try {
      const { recipe, ingredients, steps } = req.body;
  
      // Ensure ingredients and steps are arrays
      const formattedIngredients = Array.isArray(ingredients)
        ? ingredients
        : ingredients.split(',').map(ingredient => ingredient.trim());
  
      const formattedSteps = Array.isArray(steps)
        ? steps
        : steps.split(',').map(step => step.trim());
  
      // Create a new recipe object
      const newRecipe = new Recipe({
        recipe,
        ingredients: formattedIngredients,
        steps: formattedSteps,
      });
  
      // Save the new recipe
      const savedRecipe = await newRecipe.save();
      res.status(201).json(savedRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add recipe' });
    }
  });

// This section will help you update a recipe by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      recipe: req.body.recipe,
      ingredients: req.body.ingredients,
      steps: req.body.steps
    }
  };

  let collection = await db.collection("recipes");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a recipe
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("recipes");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;