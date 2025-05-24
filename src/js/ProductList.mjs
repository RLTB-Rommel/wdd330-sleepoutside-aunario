import ProductData from "./ProductData.mjs";

export default class ProductList {
  constructor(category, listElement) {
    this.category = category;
    this.listElement = listElement;
    this.dataSource = new ProductData(this.category);
  }

  async init() {
    const products = await this.dataSource.getData();
    this.renderList(products);
  }

  renderList(products) {
    const html = products.map((product) => this.productCardTemplate(product)).join("");
    this.listElement.innerHTML = html;
  }

  productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="../product_pages/?product=${product.Id}">
          <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.NameWithoutBrand}</h2>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }
}