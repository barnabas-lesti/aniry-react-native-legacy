# Daisy Mobile App

Daisy calorie counter mobile application.

## Development
```sh
# Install dependencies
npm install

# Start development server with android
npm run android

# Lint files
npm run lint
```

## Features

### Localization
- All localization related code can be found in the `src/app/i18n` folder.
- To add new translation strings, create a new feature level `messages.ts` file, then import it in the `i18n/messages` module.
- Use the app level translation hook `useAppTranslation` to access the translator instance:
```js
import { useAppTranslation } from 'src/core/hooks';
const { t } = useAppTranslation();
```

### Navigation
- All navigation related code is in the `src/app/navigation` folder.
- To add new screens to the application:
  - Add the new screen name to the `AppStackParamList` type.
  - Create new a feature level `screens.ts` file, then import it in the `navigation/screens` module.
- To access the app level navigator, use the `useAppNavigation` hook:
```js
import { useAppNavigation } from 'src/core/hooks';
const navigation = useAppNavigation<'Home'>();
```

## Resources
- https://docs.expo.dev/
- https://dev.to/dimaportenko/expo-typescript-eslint-prettier-initial-setup-54d3
- https://prettier.io/docs/en/options.html
- https://reactnavigation.org/docs/typescript
- https://www.okler.net/previews/porto-admin/4.0.0/forms-basic.html


