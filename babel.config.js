module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {  // ✅ The settings object should be inside the same array entry
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.jsx',
        ],
        alias: {
          '@cloneApp': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

