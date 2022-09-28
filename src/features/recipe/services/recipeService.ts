import { appCollectionService } from 'app/services';
import { AppItemProxy } from 'app/models';
import { Ingredient } from 'features/ingredient/models';
import { Recipe } from '../models';

const COLLECTION_NAME = 'recipes';

class RecipeService {
  /**
   * Loads recipes from the storage.
   * @param searchString Search string to filter by.
   * @returns Array of recipes.
   */
  async getMany(searchString?: string): Promise<Recipe[]> {
    const recipes = (await appCollectionService.getAll<Recipe>(COLLECTION_NAME)).map((recipe) => new Recipe(recipe));

    return Recipe.sortRecipesByName(
      searchString
        ? recipes.filter((recipe) => recipe.name.toLowerCase().search(searchString.toLowerCase()) !== -1)
        : recipes
    );
  }

  /**
   * Loads the recipe from storage with the given ID.
   * @param id ID of the recipe.
   * @returns The recipe or null.
   */
  async getOneById(id: string): Promise<Recipe | null> {
    const recipe = await appCollectionService.getOneById<Recipe>(COLLECTION_NAME, id);
    return recipe ? new Recipe(recipe) : null;
  }

  /**
   * Creates or updates an recipe in storage.
   * @param recipe Recipe to save.
   * @returns Saved recipe.
   */
  async saveOne(recipe: Recipe): Promise<Recipe> {
    return new Recipe(await appCollectionService.saveOne<Recipe>(COLLECTION_NAME, recipe));
  }

  /**
   * Removes the recipe from storage.
   * @param recipe Recipe to remove.
   */
  async deleteOne(recipe: Recipe): Promise<void> {
    await appCollectionService.deleteOne<Recipe>(COLLECTION_NAME, recipe);
  }

  /**
   * Removes the given ingredient from all recipes where present.
   * @param ingredient Ingredient to remove.
   */
  async deleteIngredientFromRecipes(ingredient: Ingredient) {
    const recipes = await this.getMany();
    await Promise.all(
      recipes.map(async (recipe) => {
        if (this.isIngredientInRecipe(ingredient, recipe)) {
          const ingredientProxies = recipe.ingredientProxies.filter(({ id }) => id !== ingredient.id);
          await this.saveOne(new Recipe({ ...recipe, ingredientProxies }));
        }
      })
    );
  }

  /**
   * Updates or occurrences of the ingredient in recipes.
   * @param ingredient Ingredient to update.
   */
  async updateIngredientInRecipes(ingredient: Ingredient) {
    const recipes = await this.getMany();
    await Promise.all(
      recipes.map(async (recipe) => {
        if (this.isIngredientInRecipe(ingredient, recipe)) {
          const ingredientProxies = recipe.ingredientProxies.map((ingredientProxy) =>
            ingredientProxy.id === ingredient.id
              ? new AppItemProxy<Ingredient>({
                  item: ingredient,
                  serving: { unit: ingredient.serving.unit, value: ingredientProxy.serving.value },
                })
              : ingredientProxy
          );
          await this.saveOne(new Recipe({ ...recipe, ingredientProxies }));
        }
      })
    );
  }

  isIngredientInRecipe(ingredient: Ingredient, recipe: Recipe) {
    return !!recipe.ingredientProxies.filter((ingredientProxy) => ingredientProxy.id === ingredient.id).length;
  }
}

/**
 * Recipe service.
 */
export const recipeService = new RecipeService();
