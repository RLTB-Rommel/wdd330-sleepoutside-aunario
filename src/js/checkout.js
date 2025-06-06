import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load dynamic header and footer
loadHeaderFooter();

// Initialize checkout process
const myCheckout = new CheckoutProcess("so-cart");
myCheckout.init();

// Use form 'submit' event for placing the order
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  myCheckout.checkout(e.target); // Pass the form to checkout
});