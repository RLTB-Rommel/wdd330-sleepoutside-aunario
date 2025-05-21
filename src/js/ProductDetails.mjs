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

        qs("#addToCart")?.addEventListener("click", this.addProductToCart.bind(this));
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

    qs('#product-name')?.textContent = p.Name ?? "Unnamed Product";
    qs('#product-brand')?.textContent = p.Brand?.Name ?? "Unknown Brand";
    qs('#product-image')?.src = p.Image ?? "";
    qs('#product-image')?.alt = p.Name ?? "Product Image";
    qs('#product-price')?.textContent = p.FinalPrice ? `$${p.FinalPrice}` : "No price available";
    qs('#product-color')?.textContent = p.Colors?.[0]?.ColorName ?? "N/A";
    qs('#product-description')?.innerHTML = p.DescriptionHtmlSimple ?? "No description available";
    qs('#addToCart')?.setAttribute('data-id', p.Id);
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