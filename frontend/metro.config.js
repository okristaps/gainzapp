const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  // Add support for SVG files
  const svgTransformerConfig = {
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  // Merge the existing transformer config with the SVG transformer config
  defaultConfig.transformer = {
    ...defaultConfig.transformer,
    ...svgTransformerConfig,
  };

  // Exclude SVG files from the default asset extensions
  defaultConfig.resolver.assetExts = [
    ...defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
    "svg",
  ];

  return defaultConfig;
})();
