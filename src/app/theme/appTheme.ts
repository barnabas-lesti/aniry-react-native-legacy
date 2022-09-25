import { MD3LightTheme } from 'react-native-paper';

export const appTheme = {
  ...MD3LightTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...MD3LightTheme.colors,
    ingredientPrimary: '#568f4c',
    recipePrimary: '#614c23',
    settingsPrimary: '#2596be',
    error: '#993025',
    tableRowSelected: '#dcdcdc',
  },
  icons: {
    home: 'home',
    ingredient: 'food-apple',
    recipe: 'food-variant',
    settings: 'cog',
  },
  gaps: {
    small: 10,
    medium: 20,
    large: 30,
  },
};
