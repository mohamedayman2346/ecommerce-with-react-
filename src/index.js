import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./CSS/components/loading.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./CSS/components/button.css";
import "./CSS/components/alert.css";
import "./CSS/components/google.css";
import "./pages/Auth/Auth.css";
// if ypu install them
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
// react bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import MenuContext from "./context/MenuContext";
import WindowContext from "./context/WindowContext";
import "react-loading-skeleton/dist/skeleton.css";
import CartChangeContext from "./context/CartChangerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <CartChangeContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartChangeContext>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
