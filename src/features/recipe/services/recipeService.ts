import { appNotificationService, appStorageService } from 'app/services';
import { Recipe } from '../models';

class RecipeService {
  private readonly COLLECTION_NAME = 'recipes';

  /**
   * Loads recipes from the storage.
   * @returns Array of recipes.
   */
  async getRecipes(searchString?: string) {
    const recipes = await appStorageService.getAll<Recipe>(this.COLLECTION_NAME);

    if (searchString) {
      return recipes.filter((recipe) => recipe.name.toLowerCase().search(searchString.toLowerCase()) !== -1);
    }

    return this.sortRecipesByName(recipes);
  }

  /**
   * Creates or updates a recipe in storage.
   * @param recipe Recipe to save.
   * @returns Saved recipe.
   */
  async saveRecipe(recipe: Recipe): Promise<Recipe> {
    if (recipe.id) {
      return this.updateRecipe(recipe);
    } else {
      return this.updateRecipe(recipe);
    }
  }

  /**
   * Creates a new recipe in storage.
   * @param recipe Recipe to create.
   * @returns Created recipe.
   */
  async createRecipe(recipe: Recipe): Promise<Recipe> {
    const createdRecipe = await this.storeRecipe(recipe);
    appNotificationService.pushNotification('recipe.notifications.created');
    return createdRecipe;
  }

  /**
   * Updates the recipe in storage.
   * @param recipe Recipe to update.
   * @returns Updated recipe.
   */
  async updateRecipe(recipe: Recipe): Promise<Recipe> {
    const updatedRecipe = await this.storeRecipe(recipe);
    appNotificationService.pushNotification('recipe.notifications.updated');
    return updatedRecipe;
  }

  /**
   * Removes the provided recipe from storage.
   * @param recipe Recipe to remove.
   */
  async deleteRecipe(recipe: Recipe): Promise<Recipe> {
    await appStorageService.deleteOne<Recipe>(this.COLLECTION_NAME, recipe);
    appNotificationService.pushNotification('recipe.notifications.deleted');
    return recipe;
  }

  /**
   * Sorts the recipes by their name property.
   * @param recipes Recipes to sort.
   * @returns Sorted recipes array.
   */
  sortRecipesByName(recipes: Array<Recipe>) {
    return [
      ...recipes.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }),
    ];
  }

  /**
   * Stores the provided recipe in storage.
   * @param recipe Recipe to save.
   * @returns Saved recipe.
   */
  private async storeRecipe(recipe: Recipe): Promise<Recipe> {
    return await appStorageService.saveOne<Recipe>(this.COLLECTION_NAME, recipe);
  }
}

/**
 * Recipe service instance.
 */
export const recipeService = new RecipeService();
