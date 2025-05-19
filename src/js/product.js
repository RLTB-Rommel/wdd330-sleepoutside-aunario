// src/js/product.js

import { getParam, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// 1. Get the product ID from the URL
const productId = getParam("product");

// 2. Create a ProductData source (tents.json)
const dataSource = new ProductData("tents");

// 3. Create a ProductDetails instance
const product = new ProductDetails(productId, dataSource);

// 4. Initialize the product page (load + render + event listener)
product.init();
