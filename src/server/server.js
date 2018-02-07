import express from "express";
import renderApp from "services/render_app";

const server = express();

server.get("*", renderApp);

export default server;
