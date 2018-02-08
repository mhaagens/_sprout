import webpack from "webpack";
import WebpackDevServer from 'webpack-dev-server';
import chalk from "chalk";
import sproutConfig from "../sprout.config.js";

export class SproutError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "Sprout";
    Error.captureStackTrace(this, this.constructor);
  }
}

export const verifyConfig = config =>
  new Promise((resolve, reject) => {
    if (!sproutConfig.clientPort || !sproutConfig.serverPort) {
      reject(new SproutError("Configuration error. Make sure clientPort and serverPort are set."))
    } else {
      resolve(console.log(chalk.green("\u2713 Sprout configuration verified")));
    }
  });

export const watchServer = config =>
  new Promise(async (resolve, reject) => {
      let firstRun = true;
      const compiler = webpack(config);
      await compiler.watch(
        {
          ignored: /node_modules/
        },
        (err, stats) => {
          if (err) reject(new SproutError("Server compilation error"));
          if (firstRun) {
            resolve(
              console.log(chalk.green("\u2713 Server compilation completed"))
            );
          }
          firstRun = false;
        }
      );
  });

export const startDevServer = config => new Promise(async (resolve,reject) => {
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, {
    host: '0.0.0.0',
    port: sproutConfig.clientPort,
    publicPath: `http://0.0.0.0:${sproutConfig.clientPort}/`,
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    proxy: {
      '/': `http://0.0.0.0:${sproutConfig.serverPort}`
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    stats: {
      colors: true
    }
  });

  devServer.listen(sproutConfig.clientPort, '0.0.0.0', () => resolve(console.log(chalk.green("\u2713 Dev server started"))))
})
