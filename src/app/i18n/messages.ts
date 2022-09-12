import { messages as homeMessages } from 'features/home/messages';
import { messages as ingredientsMessages } from 'features/ingredients/messages';
import { messages as appMessages } from '../messages';

/**
 * Application localized messages.
 * TODO: Add feature level messages to this object.
 */
export const messages = {
  en: {
    translation: {
      ...appMessages.en,
      ...homeMessages.en,
      ...ingredientsMessages.en,
    },
  },
  hu: {
    translation: {
      ...appMessages.hu,
      ...homeMessages.hu,
      ...ingredientsMessages.hu,
    },
  },
};
