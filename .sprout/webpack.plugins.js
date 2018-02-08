import webpack from "webpack";
import StartServerWebpackPlugin from "start-server-webpack-plugin";
const DEV = process.env.NODE_ENV !== "production";

const commonPlugins = [
  ...(DEV ? [new webpack.HotModuleReplacementPlugin()] : []),
  new webpack.NamedModulesPlugin()
];

export const clientPlugins = [...commonPlugins];

export const serverPlugins = sproutConfig => [
  ...commonPlugins,
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(DEV ? "development" : "production"),
      SERVER_PORT: JSON.stringify(sproutConfig.serverPort)
    }
  }),
  ...(DEV ? [new StartServerWebpackPlugin()] : [])
];
