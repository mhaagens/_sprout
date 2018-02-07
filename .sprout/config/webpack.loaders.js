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

export const clientLoaders = [
    ...commonLoaders
];

export const serverLoaders = [
    ...commonLoaders
];
