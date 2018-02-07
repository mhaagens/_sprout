import { createServer } from "http";
import chalk from "chalk";
import app from "./server";

const PORT = process.env.SERVER_PORT;

const server = createServer(app);
let currentApp = app;

server.listen(PORT, () =>
  console.log(chalk.green(`\u2713 Server listening on port ${PORT}`))
);

if (module.hot) {
  module.hot.accept("./server", () => {
    server.removeListener("request", currentApp);
    server.on("request", app);
    currentApp = app;
  });
}
