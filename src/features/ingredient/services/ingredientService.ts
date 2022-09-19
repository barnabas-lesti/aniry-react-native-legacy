import { appStorageService, appNotificationService } from 'app/services';
import { Ingredient } from '../models';

class IngredientService {
  private readonly COLLECTION_NAME = 'ingredients';

  /**
   * Loads ingredients from the storage.
   * @returns Array of ingredients.
   */
  async getIngredients(searchString?: string) {
    const ingredients = await appStorageService.getAll<Ingredient>(this.COLLECTION_NAME);

    if (searchString) {
      return ingredients.filter(
        (ingredient) => ingredient.name.toLowerCase().search(searchString.toLowerCase()) !== -1
      );
    }

    return this.sortIngredientsByName(ingredients);
  }

  /**
   * Creates a new ingredient in storage.
   * @param ingredient Ingredient to create.
   * @returns Created ingredient.
   */
  async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
    const createdIngredient = await this.saveIngredient(ingredient);
    appNotificationService.pushNotification('ingredient.notifications.created');
    return createdIngredient;
  }

  /**
   * Updates the ingredient in storage.
   * @param ingredient Ingredient to update.
   * @returns Updated ingredient.
   */
  async updateIngredient(ingredient: Ingredient): Promise<Ingredient> {
    const updatedIngredient = await this.saveIngredient(ingredient);
    appNotificationService.pushNotification('ingredient.notifications.updated');
    return updatedIngredient;
  }

  /**
   * Removes the provided ingredient from storage.
   * @param ingredient Ingredient to remove.
   */
  async deleteIngredient(ingredient: Ingredient): Promise<Ingredient> {
    await appStorageService.deleteOne<Ingredient>(this.COLLECTION_NAME, ingredient);
    appNotificationService.pushNotification('ingredient.notifications.deleted');
    return ingredient;
  }

  /**
   * Sorts the ingredients by their name property.
   * @param ingredients Ingredients to sort.
   * @returns Sorted ingredients array.
   */
  sortIngredientsByName(ingredients: Array<Ingredient>) {
    return [
      ...ingredients.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }),
    ];
  }

  /**
   * Saves the provided ingredient in storage.
   * @param ingredient Ingredient to save.
   * @returns Saved ingredient.
   */
  private async saveIngredient(ingredient: Ingredient): Promise<Ingredient> {
    return await appStorageService.saveOne<Ingredient>(this.COLLECTION_NAME, ingredient);
  }
}

export const ingredientService = new IngredientService();
