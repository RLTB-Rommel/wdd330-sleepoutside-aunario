import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category") || "tents";

const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, listElement);

productList.init();

const title = document.querySelector("#category-title");
if (title) {
  title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
}