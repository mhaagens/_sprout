import React from "react";
import { hydrate } from "react-dom";
import App from "components/app";

__webpack_public_path__ = "http://0.0.0.0:9000/";

const renderApp = Component => hydrate(<App />, document.getElementById("root"))

renderApp();