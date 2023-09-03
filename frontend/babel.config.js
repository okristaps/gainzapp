module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      require.resolve("nativewind/babel"),
      [
        "module:react-native-dotenv",

        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: "./.env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            assets: "./src/assets",
            components: "./app/components",
            tabs: "./app/tabs",
            auth: "./auth",
            firebaseConfig: "./firebaseConfig.js",
          },
        },
      ],
    ],
  };
};
