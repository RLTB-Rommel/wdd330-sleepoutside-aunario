import { getParam, qs } from './utils.mjs'; 
import ProductData from './ProductData.mjs';

const productId = getParam('id');
const category = 'tents';
const dataSource = new ProductData(category);

async function renderProductDetails() {
  try {
    console.log("🔍 Product ID from URL:", productId);

    const product = await dataSource.findProductById(productId);
    console.log("📦 Loaded product object:", product);

    if (product) {
      qs('#product-name').textContent = product.Name;
      qs('#product-brand').textContent = product.Brand?.Name ?? "Unknown Brand";
      qs('#product-image').src = product.Image;
      qs('#product-image').alt = product.Name;
      qs('#product-price').textContent = `$${product.FinalPrice}`;
      qs('#product-color').textContent = product.Colors?.[0]?.ColorName ?? "N/A";
      qs('#product-description').innerHTML = product.DescriptionHtmlSimple;
      qs('#addToCart').setAttribute('data-id', product.Id);
    } else {
      document.querySelector("main").innerHTML = `
        <h2>❌ Product Not Found</h2>
        <p>The requested product ID "<strong>${productId}</strong>" could not be found.</p>
        <p>Please check the URL or contact support if you believe this is an error.</p>
      `;
    }
  } catch (err) {
    console.error('❗ Error loading product:', err);
    document.querySelector("main").innerHTML = `
      <h2>⚠️ Error Loading Product</h2>
      <p>There was a problem retrieving product details. Please try again later.</p>
    `;
  }
}

renderProductDetails();