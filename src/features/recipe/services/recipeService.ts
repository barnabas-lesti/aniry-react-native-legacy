import { appCommonService, appStorageService } from 'app/services';
import { Ingredient, IngredientProxy } from 'features/ingredient/models';
import { Recipe } from '../models';

class RecipeService {
  private readonly COLLECTION_NAME = 'recipes';

  /**
   * Loads recipes from the storage.
   * @returns Array of recipes.
   */
  async getRecipes(searchString?: string) {
    const recipes = (await appStorageService.getAll<Recipe>(this.COLLECTION_NAME)).map((recipe) => new Recipe(recipe));

    if (searchString) {
      return recipes.filter((recipe) => recipe.name.toLowerCase().search(searchString.toLowerCase()) !== -1);
    }

    return Recipe.sortRecipesByName(recipes);
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    return (await this.getRecipes()).filter((recipe) => recipe.id === id)[0] || null;
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
      return this.createRecipe(recipe);
    }
  }

  /**
   * Creates a new recipe in storage.
   * @param recipe Recipe to create.
   * @returns Created recipe.
   */
  async createRecipe(recipe: Recipe): Promise<Recipe> {
    const createdRecipe = await this.storeRecipe(recipe);
    appCommonService.pushNotification('recipe.notifications.created');
    return createdRecipe;
  }

  /**
   * Updates the recipe in storage.
   * @param recipe Recipe to update.
   * @returns Updated recipe.
   */
  async updateRecipe(recipe: Recipe): Promise<Recipe> {
    const updatedRecipe = await this.storeRecipe(recipe);
    appCommonService.pushNotification('recipe.notifications.updated');
    return updatedRecipe;
  }

  /**
   * Removes the recipe from storage.
   * @param id ID of the recipe to remove.
   */
  async deleteRecipeById(id: string): Promise<void> {
    await appStorageService.deleteOneById<Recipe>(this.COLLECTION_NAME, id);
    appCommonService.pushNotification('recipe.notifications.deleted');
  }

  /**
   * Removes the given ingredient from all recipes where present.
   * @param ingredient Ingredient to remove.
   */
  async deleteIngredientFromRecipes(ingredient: Ingredient) {
    const recipes = await this.getRecipes();
    await Promise.all(
      recipes.map(async (recipe) => {
        if (this.isIngredientInRecipe(ingredient, recipe)) {
          const ingredientProxies = recipe.ingredientProxies.filter(({ id }) => id !== ingredient.id);
          await this.storeRecipe(new Recipe({ ...recipe, ingredientProxies }));
        }
      })
    );
  }

  /**
   * Updates or occurrences of the ingredient in recipes.
   * @param ingredient Ingredient to update.
   */
  async updateIngredientInRecipes(ingredient: Ingredient) {
    const recipes = await this.getRecipes();
    await Promise.all(
      recipes.map(async (recipe) => {
        if (this.isIngredientInRecipe(ingredient, recipe)) {
          const ingredientProxies = recipe.ingredientProxies.map((ingredientProxy) =>
            ingredientProxy.id === ingredient.id
              ? new IngredientProxy({ ingredient, servingValue: ingredientProxy.serving.value })
              : ingredientProxy
          );
          await this.storeRecipe(new Recipe({ ...recipe, ingredientProxies }));
        }
      })
    );
  }

  private isIngredientInRecipe(ingredient: Ingredient, recipe: Recipe) {
    return !!recipe.ingredientProxies.filter((ingredientProxy) => ingredientProxy.id === ingredient.id).length;
  }

  /**
   * Stores the provided recipe in storage.
   * @param recipe Recipe to save.
   * @returns Saved recipe.
   */
  private async storeRecipe(recipe: Recipe): Promise<Recipe> {
    return new Recipe(await appStorageService.saveOne<Recipe>(this.COLLECTION_NAME, recipe));
  }
}

/**
 * Recipe service instance.
 */
export const recipeService = new RecipeService();
