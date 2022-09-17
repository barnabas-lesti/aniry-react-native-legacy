import { appStorageService } from 'app/services';
import { Ingredient } from '../models';

class IngredientService {
  private readonly COLLECTION_NAME = 'ingredients';

  /**
   * Saves the provided ingredient in storage.
   * @param ingredient Ingredient to save.
   */
  async saveIngredient(ingredient: Ingredient) {
    return await appStorageService.saveOne<Ingredient>(this.COLLECTION_NAME, ingredient);
  }

  /**
   * Loads ingredients from the storage.
   * @returns Array of ingredients.
   */
  async fetchIngredients(searchString?: string) {
    const ingredients = await appStorageService.getAll<Ingredient>(this.COLLECTION_NAME);

    if (searchString) {
      return ingredients.filter(
        (ingredient) => ingredient.name.toLowerCase().search(searchString.toLowerCase()) !== -1
      );
    }

    return ingredients;
  }

  /**
   * Removes the provided ingredient from storage.
   * @param ingredientId Ingredient to remove.
   */
  async deleteIngredient(ingredient: Ingredient) {
    await appStorageService.deleteOne<Ingredient>(this.COLLECTION_NAME, ingredient);
  }

  /**
   * Sorts the ingredients by their name property.
   * @param ingredients Ingredients to sort.
   * @returns Sorted ingredients array.
   */
  sortIngredientsByName(ingredients: Array<Ingredient>) {
    return ingredients.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }
}

export const ingredientService = new IngredientService();
