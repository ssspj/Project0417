import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyle from "./font/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter basename={process.env.PUBLIC_URL}></BrowserRouter>
    <App />
  </React.StrictMode>
);
