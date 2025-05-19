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

        // Setup Add to Cart button
        document.getElementById("addToCart")
          ?.addEventListener("click", this.addProductToCart.bind(this));
      } else {
        document.querySelector("main").innerHTML = `
          <h2>❌ Product Not Found</h2>
          <p>The requested product ID "<strong>${this.productId}</strong>" could not be found.</p>
        `;
      }
    } catch (err) {
      console.error('❗ Error loading product:', err);
      document.querySelector("main").innerHTML = `
        <h2>⚠️ Error Loading Product</h2>
        <p><strong>${err.message}</strong></p>
      `;
    }
  }

  renderProductDetails() {
    qs('#product-name').textContent = this.product.Name;
    qs('#product-brand').textContent = this.product.Brand?.Name ?? "Unknown Brand";
    qs('#product-image').src = this.product.Image;
    qs('#product-image').alt = this.product.Name;
    qs('#product-price').textContent = `$${this.product.FinalPrice}`;
    qs('#product-color').textContent = this.product.Colors?.[0]?.ColorName ?? "N/A";
    qs('#product-description').innerHTML = this.product.DescriptionHtmlSimple;
    qs('#addToCart').setAttribute('data-id', this.product.Id);
  }

  addProductToCart() {
    setLocalStorage("so-cart", this.product);
  }
}