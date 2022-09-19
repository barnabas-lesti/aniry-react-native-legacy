import { Recipe } from './Recipe';

export type RecipeStackParamList = {
  RecipeHome: undefined;
  RecipeCreate: undefined;
  RecipeEdit: { recipe: Recipe };
};
