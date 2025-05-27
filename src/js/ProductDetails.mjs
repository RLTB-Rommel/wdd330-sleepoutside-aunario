import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand?.Name || "Unknown Brand";
  document.querySelector('h3').textContent = product.NameWithoutBrand || product.Name;

  // Image
  const productImage = document.getElementById('productImage');
  productImage.src = product.Image || "/images/default.jpg";
  productImage.alt = product.NameWithoutBrand || "Product Image";

  // Pricing and Discount
  const priceElement = document.getElementById('productPrice');
  priceElement.innerHTML = ""; // Clear previous content

  const originalPrice = parseFloat(product.SuggestedRetailPrice);
  const finalPrice = parseFloat(product.FinalPrice);

  if (!isNaN(originalPrice) && !isNaN(finalPrice) && finalPrice < originalPrice) {
    const discountPercentage = Math.round(
      ((originalPrice - finalPrice) / originalPrice) * 100
    );

    const original = document.createElement("span");
    original.textContent = `$${originalPrice.toFixed(2)}`;
    original.style.textDecoration = "line-through";
    original.style.marginRight = "8px";

    const discounted = document.createElement("span");
    discounted.textContent = `$${finalPrice.toFixed(2)}`;
    discounted.style.color = "green";
    discounted.style.fontWeight = "bold";

    const label = document.createElement("p");
    label.textContent = `Discounted! Save ${discountPercentage}%`;
    label.style.color = "red";
    label.style.fontStyle = "italic";
    label.style.marginTop = "4px";

    priceElement.appendChild(original);
    priceElement.appendChild(discounted);
    priceElement.appendChild(label);
  } else {
    priceElement.textContent = `$${finalPrice.toFixed(2)}`;
  }

  // Color
  document.getElementById('productColor').textContent = product.Colors?.[0]?.ColorName || "N/A";

  // Description
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple || "No description available.";

  // Add to Cart button
  document.getElementById('addToCart').dataset.id = product.Id;
}