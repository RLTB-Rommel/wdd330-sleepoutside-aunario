import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load dynamic header and footer
loadHeaderFooter();

// Initialize checkout process
const myCheckout = new CheckoutProcess("so-cart");
myCheckout.init();

// Enhanced submit handling with manual validity check
const form = document.forms["checkout"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = form.checkValidity();
  form.reportValidity();

  if (isValid) {
    myCheckout.checkout(form);
  }
});