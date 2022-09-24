import { appStorageService, appCommonService } from 'app/services';
import { recipeService } from 'features/recipe/services';
import { Ingredient } from '../models';

class IngredientService {
  private readonly COLLECTION_NAME = 'ingredients';

  /**
   * Loads ingredients from the storage.
   * @returns Array of ingredients.
   */
  async getIngredients(searchString?: string) {
    const ingredients = (await appStorageService.getAll<Ingredient>(this.COLLECTION_NAME)).map(
      (ingredient) => new Ingredient(ingredient)
    );

    if (searchString) {
      return ingredients.filter(
        (ingredient) => ingredient.name.toLowerCase().search(searchString.toLowerCase()) !== -1
      );
    }

    return Ingredient.sortIngredientsByName(ingredients);
  }

  /**
   * Loads the ingredient from storage with the given ID.
   * @param id ID of the ingredient.
   * @returns The ingredient or null.
   */
  async getIngredientById(id: string): Promise<Ingredient | null> {
    return (await this.getIngredients()).filter((ingredient) => ingredient.id === id)[0] || null;
  }

  /**
   * Creates or updates an ingredient in storage.
   * @param ingredient Ingredient to save.
   * @returns Saved ingredient.
   */
  async saveIngredient(ingredient: Ingredient): Promise<Ingredient> {
    if (ingredient.id) {
      return this.updateIngredient(ingredient);
    } else {
      return this.createIngredient(ingredient);
    }
  }

  /**
   * Creates a new ingredient in storage.
   * @param ingredient Ingredient to create.
   * @returns Created ingredient.
   */
  async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
    const createdIngredient = await this.storeIngredient(ingredient);
    appCommonService.pushNotification('ingredient.notifications.created');
    return createdIngredient;
  }

  /**
   * Updates the ingredient in storage.
   * @param ingredient Ingredient to update.
   * @returns Updated ingredient.
   */
  async updateIngredient(ingredient: Ingredient): Promise<Ingredient> {
    const updatedIngredient = await this.storeIngredient(ingredient);
    await recipeService.updateIngredientInRecipes(updatedIngredient);
    appCommonService.pushNotification('ingredient.notifications.updated');
    return updatedIngredient;
  }

  /**
   * Removes the provided ingredient from storage.
   * @param ingredient Ingredient to remove.
   */
  async deleteIngredient(ingredient: Ingredient): Promise<Ingredient> {
    await recipeService.deleteIngredientFromRecipes(ingredient);
    await appStorageService.deleteOne<Ingredient>(this.COLLECTION_NAME, ingredient);
    appCommonService.pushNotification('ingredient.notifications.deleted');
    return ingredient;
  }

  /**
   * Stores the provided ingredient in storage.
   * @param ingredient Ingredient to save.
   * @returns Saved ingredient.
   */
  private async storeIngredient(ingredient: Ingredient): Promise<Ingredient> {
    return new Ingredient(await appStorageService.saveOne<Ingredient>(this.COLLECTION_NAME, ingredient));
  }
}

export const ingredientService = new IngredientService();
