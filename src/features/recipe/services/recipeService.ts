import { Recipe } from '../models';

class RecipeService {
  async getRecipes(searchString?: string): Promise<Recipe[]> {
    return [];
  }

  async createRecipe(recipe: Recipe) {
    return recipe;
  }

  async updateRecipe(recipe: Recipe) {
    return recipe;
  }

  async deleteRecipe(recipe: Recipe) {
    return recipe;
  }
}

export const recipeService = new RecipeService();
