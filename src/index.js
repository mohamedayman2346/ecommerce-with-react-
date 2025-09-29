import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import WindowSize from "./Context/WindowSize";
import App from "./App";
import "./website/Auth/auth.css";
import IsOpen from "./Context/IsOpen";
// # js file import (using webpack)
import "react-image-gallery/styles/css/image-gallery.css";
import IsChanger from "./Context/IsChanger";
import BestChange from "./Context/BestChange";
// animate css
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <IsOpen>
        <WindowSize>
        <IsChanger>
        <BestChange>
          <App />
        </BestChange>
        </IsChanger>
        </WindowSize>
      </IsOpen>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
