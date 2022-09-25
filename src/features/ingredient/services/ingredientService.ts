import { appCollectionService } from 'app/services';
import { recipeService } from 'features/recipe/services';
import { Ingredient } from '../models';

const COLLECTION_NAME = 'ingredients';

class IngredientService {
  /**
   * Loads ingredients from the storage.
   * @param searchString Search string used to filter by name.
   * @returns Array of ingredients.
   */
  async getMany(searchString: string = ''): Promise<Ingredient[]> {
    const ingredients = (await appCollectionService.getAll<Ingredient>(COLLECTION_NAME)).map(
      (ingredient) => new Ingredient(ingredient)
    );

    return Ingredient.sortIngredientsByName(
      searchString
        ? ingredients.filter((ingredient) => ingredient.name.toLowerCase().search(searchString.toLowerCase()) !== -1)
        : ingredients
    );
  }

  /**
   * Loads the ingredient from storage with the given ID.
   * @param id ID of the ingredient.
   * @returns The ingredient or null.
   */
  async getOneById(id: string): Promise<Ingredient | null> {
    const ingredient = await appCollectionService.getOneById<Ingredient>(COLLECTION_NAME, id);
    return ingredient ? new Ingredient(ingredient) : null;
  }

  /**
   * Creates or updates an ingredient in storage.
   * @param ingredient Ingredient to save.
   * @returns Saved ingredient.
   */
  async saveOne(ingredient: Ingredient): Promise<Ingredient> {
    const savedIngredient = new Ingredient(await appCollectionService.saveOne<Ingredient>(COLLECTION_NAME, ingredient));
    ingredient.id && (await recipeService.updateIngredientInRecipes(savedIngredient));
    return savedIngredient;
  }

  /**
   * Removes the ingredient from storage.
   * @param ingredient Ingredient to remove.
   */
  async deleteOne(ingredient: Ingredient): Promise<void> {
    await recipeService.deleteIngredientFromRecipes(ingredient);
    await appCollectionService.deleteOne<Ingredient>(COLLECTION_NAME, ingredient);
  }
}

/**
 * Ingredient service.
 */
export const ingredientService = new IngredientService();
