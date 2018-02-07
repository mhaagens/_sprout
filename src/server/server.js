import express from "express";

const server = express();

server.get("/", (req, res) => {
  res.send("HELLO SPROUT!!!");
});

export default server;
