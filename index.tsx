import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// This div is on the client site: <div id="tool" data-key="..."></div>
const el = document.getElementById("tool");

if (el) {
  // If prerendered HTML exists, hydrate. Otherwise, fall back to client render.
  if (el.hasChildNodes()) {
    hydrateRoot(el, <App />);
  } else {
    createRoot(el).render(<App />);
  }
}
