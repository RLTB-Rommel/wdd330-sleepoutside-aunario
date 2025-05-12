import { setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

//I need to correct this because it overwrites the existing everytime because it save a single object

//function addProductToCart(product) {
//  setLocalStorage('so-cart', product);
//}

function addProductToCart(product) {
  // Get the current cart from localStorage, or use an empty array
  const cart = JSON.parse(localStorage.getItem('so-cart')) || [];

  // Add the new product to the cart
  cart.push(product);

  // Save the updated cart back to localStorage
  localStorage.setItem('so-cart', JSON.stringify(cart));
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
