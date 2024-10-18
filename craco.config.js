const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  babel: {
    presets: [
      ["@babel/preset-env", { targets: { esmodules: true } }],
      ["@babel/preset-react", { runtime: "automatic" }],
    ],
    plugins: [],
    loaderOptions: (babelLoaderOptions) => babelLoaderOptions,
  },
  devServer: {
    port: 5000,
  },
};
