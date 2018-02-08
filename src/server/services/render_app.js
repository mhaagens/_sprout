import React from "react";
import { renderToNodeStream } from "react-dom/server";
import App from "components/app";

const renderApp = (req, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const head = `<!doctype html>
      <html lang="">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sprout</title>

          <meta name="msapplication-tap-highlight" content="no">

          <link rel="manifest" href="manifest.json">

          <meta name="mobile-web-app-capable" content="yes">
          <meta name="application-name" content="Web Starter Kit">
          <link rel="icon" sizes="192x192" href="images/touch/chrome-touch-icon-192x192.png">

          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-status-bar-style" content="black">
          <meta name="apple-mobile-web-app-title" content="Web Starter Kit">
          <link rel="apple-touch-icon" href="images/touch/apple-touch-icon.png">

          <meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">
          <meta name="msapplication-TileColor" content="#2F3BA2">

          <meta name="theme-color" content="#2F3BA2">

          <link rel="canonical" href="http://www.example.com/">
        </head>
        <body>
        <div id="root">`;

      const footer = `</div>
      <script src="http://localhost:9000/app.js"></script>
      </body>
      </html>`;

      res.write(head);

      const stream = renderToNodeStream(<App />)
        .on("end", () => {
          res.write(footer);
          res.end();
        })
        .pipe(res, { end: false });

      resolve();
    } catch (err) {
      console.log(err);
      res.send("Error");
    }
  });

export default renderApp;
