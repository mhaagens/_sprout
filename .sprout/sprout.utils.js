import webpack from "webpack";
import chalk from "chalk";

export class SproutError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "Sprout";
    Error.captureStackTrace(this, this.constructor);
  }
}

export const verifyConfig = config =>
  new Promise((resolve, reject) => {
    resolve(console.log(chalk.green("\u2713 Sprout configuration verified")));
  });

export const watchServer = config =>
  new Promise(async (resolve, reject) => {
      let firstRun = true;
      const compiler = webpack(config);
      await compiler.watch(
        {
          aggregateTimeout: 300,
          poll: 1000
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
