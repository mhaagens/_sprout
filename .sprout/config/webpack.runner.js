import { resolve } from "path";
import { inspect } from "util";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import PrettyError from "pretty-error";
import * as sproutUtils from "./sprout.utils.js";
import sproutConfig from "../../sprout.config.js";
import * as loaders from "./webpack.loaders.js";
import * as plugins from "./webpack.plugins.js";

// Pretty print errors
const pe = new PrettyError();
pe.start();

// Environment
const DEV = process.env.NODE_ENV !== "production";

// Resolve folders
const BASE_DIR = resolve(__dirname, "../../");
const SRC_DIR = resolve(BASE_DIR, "src");
const BUILD_DIR = resolve(BASE_DIR, "build");

// Run configuration and Webpack
(async () => {
  try {
    // Get aliases

    let clientAliases = {};
    let serverAliases = {};

    for (let [k, v] of Object.entries(sproutConfig.aliases.client)) {
      clientAliases[k] = `${SRC_DIR}/${v}`;
    }

    for (let [k, v] of Object.entries(sproutConfig.aliases.server)) {
      serverAliases[k] = `${SRC_DIR}/${v}`;
    }

    // Verify configuration
    await sproutUtils.verifyConfig(sproutConfig);

    // Client configuration
    const clientConfig = {
      entry: `${SRC_DIR}/client/index.js`,
      module: { rules: [...loaders.clientLoaders] },
      plugins: [...plugins.clientPlugins],
      resolve: {
        alias: clientAliases
      },
      output: {
        path: BUILD_DIR,
        publicPath: "/",
        filename: "app.js",
        chunkFilename: "[name].app.js"
      }
    };

    // Server configuration
    const serverConfig = {
      entry: [
        ...(DEV ? ["webpack/hot/poll?1000"] : []),
        `${SRC_DIR}/server/index.js`
      ],
      watch: DEV,
      target: "node",
      externals: [
        nodeExternals({
          whitelist: DEV ? ["webpack/hot/poll?1000"] : []
        })
      ],
      module: { rules: [...loaders.serverLoaders] },
      plugins: [...plugins.serverPlugins(sproutConfig)],
      resolve: {
        alias: serverAliases
      },
      output: { path: BUILD_DIR, publicPath: "/", filename: "server.js" }
    };

    // Run webpack
    if (!DEV) {
    } else {
      await sproutUtils.watchServer(serverConfig);
    }
  } catch (err) {
    console.log(err);
  }
})();
