import { AppServingUnit } from 'app/models';

export const ingredientServingUnits: { [key in AppServingUnit]: string } = {
  g: 'app.units.g',
  ml: 'app.units.ml',
  piece: 'app.units.piece',
};
