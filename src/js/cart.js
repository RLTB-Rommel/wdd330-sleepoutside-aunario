import { getLocalStorage } from "./utils.mjs";

function getTentVariants(baseItem, tentList) {
  return tentList.filter(t =>
    t.Brand?.Name === baseItem.Brand?.Name &&
    t.NameWithoutBrand?.split(" ")[0] === baseItem.NameWithoutBrand?.split(" ")[0]
  );
}

function cartItemTemplate(item, index) {
  const allTents = getLocalStorage("tents-data") || [];
  const quantity = item.quantity || 1;
  const productGroup = getTentVariants(item, allTents).slice(0, 3);

  const slides = productGroup.map((variant, i) => `
    <div class="carousel-slide ${i === 0 ? "active" : ""}">
      <img src="${variant.Image}" alt="${variant.Name}" />
      <div class="details">
        <div class="category">${variant.Brand.Name}</div>
        <h3>${variant.NameWithoutBrand}</h3>
        <p>${variant.Colors?.[0]?.ColorName || "N/A"}</p>
        <p class="price">Total: $${(variant.FinalPrice * quantity).toFixed(2)}</p>
      </div>
    </div>
  `).join("");

  const radios = productGroup.map((_, i) => `
    <input type="radio" name="product-${index}" ${i === 0 ? "checked" : ""}>
  `).join("");

  return `<li class="carousel-card">
    <div class="carousel-container">
      ${slides}
    </div>
    <div class="carousel-nav">
      ${radios}
    </div>
  </li>`;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `
      <div class="empty-cart-msg">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a href="/index.html" class="shop-now-button">Continue Shopping</a>
      </div>`;
    return;
  }

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  //document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelector(".carousel-grid").innerHTML = htmlItems.join("");

  // Attach carousel behavior
  document.querySelectorAll(".carousel-card").forEach((card) => {
    const slides = card.querySelectorAll(".carousel-slide");
    const radios = card.querySelectorAll(".carousel-nav input");

    radios.forEach((radio, i) => {
      radio.addEventListener("change", () => {
        slides.forEach((slide) => slide.classList.remove("active"));
        slides[i].classList.add("active");
      });
    });
  });
}

// Load tents.json and cache in localStorage
if (!getLocalStorage("tents-data")) {
  fetch("/json/tents.json")
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("tents-data", JSON.stringify(data));
      renderCartContents();
    });
} else {
  renderCartContents();
}