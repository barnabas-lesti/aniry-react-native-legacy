module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src/'],
          alias: {
            // This needs to be mirrored in tsconfig.json
            app: './src/app',
            features: './src/features',
          },
        },
      ],
    ],
  };
};
