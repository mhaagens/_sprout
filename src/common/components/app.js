import React from "react";
import { hot } from "react-hot-loader";

const App = () => <div onClick={() => alert("Hello World")}>PM!!</div>;

export default hot(module)(App);