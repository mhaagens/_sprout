const commonLoaders = [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: "babel-loader",
      options: {
        babelrc: false,
        presets: [
          [
            "env",
            {
              modules: false,
              targets: {
                node: "current"
              }
            }
          ],
          "react",
          "stage-0"
        ]
      }
    }
  }
];

let clientLoaders = [
  ...commonLoaders
];

let serverLoaders = [
    ...commonLoaders
];

// Overrides
clientLoaders[0].use.options.plugins = ["react-hot-loader/babel"];

export {
  clientLoaders,
  serverLoaders
}
