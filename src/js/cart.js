import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  const totalPrice = (item.FinalPrice * quantity).toFixed(2);

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">Total: $${totalPrice}</p>
  </li>`;
}

renderCartContents();