import { ingredientsMessages } from 'features/ingredients';

/**
 * Application localized messages.
 */
export const appMessages = {
  en: {
    translation: {
      'app.units.g': 'g',
      'app.units.ml': 'ml',
      'app.units.kcal': 'kcal',

      'app.labels.save': 'Save',
      'app.labels.delete': 'Delete',
      'app.labels.discard': 'Discard',
      'app.labels.cancel': 'Cancel',
      'app.labels.confirm': 'Confirm',
      'app.labels.name': 'Name',
      'app.labels.serving': 'Serving',
      'app.labels.calories': 'Calories',
      'app.labels.carbs': 'Carbs',
      'app.labels.protein': 'Protein',
      'app.labels.fat': 'Fat',

      ...ingredientsMessages.en,
    },
  },
  hu: {
    translation: {
      ...ingredientsMessages.hu,
    },
  },
};
