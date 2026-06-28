import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import VideoPlayerProvider from "./components/common/VideoPlayerProvider";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <VideoPlayerProvider>
        <App />
      </VideoPlayerProvider>
    </BrowserRouter>
  </React.StrictMode>
);