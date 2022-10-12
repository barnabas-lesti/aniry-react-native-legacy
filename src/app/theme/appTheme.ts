import { TextStyle } from 'react-native';
import { MD3LightTheme } from 'react-native-paper';

export const appTheme = {
  ...MD3LightTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...MD3LightTheme.colors,
    diaryPrimary: '#284d8a',
    ingredientPrimary: '#568f4c',
    recipePrimary: '#614c23',
    settingsPrimary: '#2596be',
    error: '#993025',
    textSecondary: '#575656',
    nutrients: {
      carbs: '#1aa3ff',
      protein: '#ff4d4d',
      fat: '#ff8c1a',
    },
    navbarBackground: '#fff',
    inactive: '#999',
  },
  icons: {
    diary: 'calculator',
    ingredient: 'food-apple',
    recipe: 'food-variant',
    settings: 'cog',
    circle: 'checkbox-blank-circle',
  },
  gaps: {
    small: 10,
    medium: 20,
    large: 30,
  },
  styles: {
    title: {
      fontWeight: '400',
      fontSize: 22,
      lineHeight: 22,
    } as TextStyle,
  },
};
