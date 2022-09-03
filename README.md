# Daisy Mobile App

Daisy calorie counter mobile application.

## Development
```sh
# Install dependencies
npm install

# Start development web server
npm run web

# Lint files
npm run lint
```

## Features

### Localization
- All localization related code can be found in the `./src/i18n` folder.
- To add new translation strings, update the translation objects found in the `resources` folder.
- Use the app level translation hook `useAppTranslation` to access the translator instance.
```js
import { useAppTranslation } from '../../i18n';

const { t } = useAppTranslation();
```

### Navigation
- All navigation related code is in the `./src/navigation` folder.
- Add the new screen name to the `RootStackParamList` type.
- Add the new screen configuration to the `screens` array in the `screens.ts` file.
- To access the app level navigator, use the `useAppNavigation` hook.
```js
import { useAppNavigation } from '../../navigation';

const navigation = useAppNavigation<'Home'>();
```

## Resources
- https://docs.expo.dev/
- https://dev.to/dimaportenko/expo-typescript-eslint-prettier-initial-setup-54d3
- https://prettier.io/docs/en/options.html
- https://reactnavigation.org/docs/typescript

