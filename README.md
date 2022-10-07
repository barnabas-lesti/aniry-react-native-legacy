# Aniry Calorie Counter

Aniry calorie counter mobile application.

## First time setup
Install and configure the following tools:
- [Git](https://git-scm.com/downloads)
  - On Mac, install [Xcode](https://developer.apple.com/xcode/) from the App Store and verify that **Git** is available:
```
git --version
```
- [NodeJS](https://nodejs.org/en/download/)
- [VSCode](https://code.visualstudio.com/download) with extensions:
  - Code Spell Checker
  - ESLint
  - Prettier
- Clone the repository with **VSCode**
  - Authenticate using GitHub
  - Set git username and email for the repo:
```
git config user.name "Barnabas Lesti"
git config user.email "barnabas.lesti@gmail.com"
```
- Install dependencies
- Verify that the development server can be started
- Set up simulators:
  - For Android, install [Android Studio](https://developer.android.com/studio)
  - For iOS, **Xcode** handles the simulators
    - To run a specific simulator:
      1. Open the **Simulator** app from **Xcode**:
        - *Open Developer Tool > Simulator*
      2. In the **Simulator** app:
        - *File > Open Simulator*

## Development
```sh
# Install dependencies
npm install

# Start the development server
npm run start

# Lint files
npm run lint
```

## Resources
- https://docs.expo.dev/
- https://dev.to/dimaportenko/expo-typescript-eslint-prettier-initial-setup-54d3
- https://prettier.io/docs/en/options.html
- https://reactnavigation.org/docs/typescript
- https://www.okler.net/previews/porto-admin/4.0.0/forms-basic.html
- https://github.com/react-native-async-storage/async-storage
- https://callstack.github.io/react-native-paper/index.html
- https://redux-toolkit.js.org
- https://github.com/reduxjs/reselect
