import { loadHeaderFooter } from "./utils.mjs";
//import "./brand-carousel.js";
import "./brand-carousel.js";



loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const brandConfigs = [
    { selector: "#marmot-card", json: "marmot.json" },
    { selector: "#northface-card", json: "the-north-face.json" },
    { selector: "#cedar-card", json: "cedar-ridge.json" },
    { selector: "#agnes-card", json: "big-agnes.json" }
  ];

  brandConfigs.forEach(({ selector, json }) => {
    const container = document.querySelector(selector);
    if (container) {
      setupBrandCarousel(container, json);
    }
  });
});