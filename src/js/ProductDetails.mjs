// js/ProductDetails.mjs

import { getParam, qs } from './utils.mjs';
import { findProductById } from './ProductData.mjs';

// 1. Get product ID from URL
const productId = getParam('id');

// 2. Fetch the product data
const product = findProductById(productId);

// 3. Populate the page
if (product) {
  qs('#product-name').textContent = product.name;
  qs('#product-image').src = product.image;
  qs('#product-description').textContent = product.description;
  qs('#product-price').textContent = product.price;
} else {
  document.body.innerHTML = "<h2>Product not found</h2>";
}