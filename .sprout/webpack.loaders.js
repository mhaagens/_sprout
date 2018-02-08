import produce from "immer";

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

export const clientLoaders = produce(commonLoaders, draftState => {

});

export const serverLoaders = produce(commonLoaders, draftState => {
  draftState[0].use.options.plugins = ['react-hot-loader/babel'];
});