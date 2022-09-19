import { Recipe } from '../models';

class RecipeService {
  async getRecipes(searchString?: string): Promise<Recipe[]> {
    return [];
  }
}

export const recipeService = new RecipeService();
