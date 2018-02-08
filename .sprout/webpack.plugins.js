import produce from "immer";
import webpack from "webpack";
import StartServerWebpackPlugin from "start-server-webpack-plugin";
import sproutConfig from "../sprout.config.js";

const DEV = process.env.NODE_ENV !== "production";

const commonPlugins = [
  ...(DEV ? [new webpack.HotModuleReplacementPlugin()] : []),
  new webpack.NamedModulesPlugin()
];

export const clientPlugins = produce(commonPlugins, draftState => {

});

export const serverPlugins = produce(commonPlugins, draftState => {

  draftState.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(DEV ? "development" : "production"),
        SERVER_PORT: JSON.stringify(sproutConfig.serverPort)
      }
    })  
  )

  if (DEV) {
    draftState.push(
      new StartServerWebpackPlugin()
    )
  }
  
});

console.log(serverPlugins);
