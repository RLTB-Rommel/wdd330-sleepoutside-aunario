import { qs, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);

      if (this.product) {
        this.renderProductDetails();

        const addBtn = qs("#addToCart");
        if (addBtn) {
          addBtn.addEventListener("click", this.addProductToCart.bind(this));
        }
      } else {
        this.renderMessage(
          "❌ Product Not Found",
          `The requested product ID "<strong>${this.productId}</strong>" could not be found.`
        );
      }
    } catch (err) {
      console.error('❗ Error loading product:', err);
      this.renderMessage("⚠️ Error Loading Product", `<strong>${err.message}</strong>`);
    }
  }

  renderProductDetails() {
    const p = this.product;

    const nameEl = qs('#product-name');
    if (nameEl) nameEl.textContent = p.Name ?? "Unnamed Product";

    const brandEl = qs('#product-brand');
    if (brandEl) brandEl.textContent = p.Brand?.Name ?? "Unknown Brand";

    const imgEl = qs('#product-image');
    if (imgEl) {
      imgEl.src = p.Image ?? "";
      imgEl.alt = p.Name ?? "Product Image";
    }

    const priceEl = qs('#product-price');
    if (priceEl) priceEl.textContent = p.FinalPrice ? `$${p.FinalPrice}` : "No price available";

    const colorEl = qs('#product-color');
    if (colorEl) colorEl.textContent = p.Colors?.[0]?.ColorName ?? "N/A";

    const descEl = qs('#product-description');
    if (descEl) descEl.innerHTML = p.DescriptionHtmlSimple ?? "No description available";

    const addBtn = qs('#addToCart');
    if (addBtn) addBtn.setAttribute('data-id', p.Id);
  }

  renderMessage(title, message) {
    const main = document.querySelector("main");
    if (main) {
      main.innerHTML = `<h2>${title}</h2><p>${message}</p>`;
    } else {
      console.warn("Main container not found in DOM.");
    }
  }

  addProductToCart() {
    if (this.product?.Id) {
      setLocalStorage("so-cart", this.product);
      console.log(`✅ Added product "${this.product.Name}" to cart.`);
    } else {
      console.warn("⚠️ No product found to add to cart.");
    }
  }
}