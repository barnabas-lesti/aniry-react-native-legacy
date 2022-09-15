import { storageService } from 'app/services';
import { Ingredient } from '../models';

class IngredientsService {
  private readonly COLLECTION_NAME = 'ingredients';

  /**
   * Saves the provided ingredient in storage.
   * @param ingredient Ingredient to save.
   */
  async saveIngredient(ingredient: Ingredient) {
    await storageService.saveOne<Ingredient>(this.COLLECTION_NAME, ingredient);
  }

  /**
   * Loads ingredients from the storage.
   * @returns Array of ingredients.
   */
  async fetchIngredients() {
    return await storageService.fetchMany<Ingredient>(this.COLLECTION_NAME);
  }

  /**
   * Removes the provided ingredient from storage.
   * @param ingredientId Ingredient to remove.
   */
  async deleteIngredientById(ingredientId: string) {
    await storageService.deleteOneById<Ingredient>(this.COLLECTION_NAME, ingredientId);
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

export const ingredientsService = new IngredientsService();
