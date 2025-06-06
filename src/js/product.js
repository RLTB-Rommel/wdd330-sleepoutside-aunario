import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productID = getParam("product");
const categories = ["tents", "backpacks", "sleeping-bags"];

async function loadProduct(productID) {
  for (let category of categories) {
    const dataSource = new ProductData(category);
    const product = await dataSource.findProductById(productID);
    if (product) {
      const productDetail = new ProductDetails(productID, dataSource);
      productDetail.product = product;
      productDetail.renderProductDetails();
      document
        .getElementById("addToCart")
        .addEventListener("click", productDetail.addProductToCart.bind(productDetail));
      return;
    }
  }

  // Product not found
  document.querySelector("main").innerHTML = `
    <h2>Product Not Found</h2>
    <p>No product matches ID <strong>${productID}</strong>.</p>
  `;
}

loadProduct(productID);