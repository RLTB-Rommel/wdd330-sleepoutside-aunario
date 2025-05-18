import { getParam, qs } from './utils.mjs';
import ProductData from './ProductData.mjs';

const productId = getParam('id');
const category = 'tents';

const dataSource = new ProductData(category);

async function renderProductDetails() {
  try {
    const product = await dataSource.findProductById(productId);

    if (product) {
      qs('#product-name').textContent = product.Name;
      qs('#product-brand').textContent = product.Brand?.Name || 'Unknown Brand';
      qs('#product-image').src = product.Image;
      qs('#product-image').alt = product.Name;
      qs('#product-description').innerHTML = product.DescriptionHtmlSimple;
      qs('#product-price').textContent = `$${product.FinalPrice}`;
      qs('#product-color').textContent = product.Colors?.[0]?.ColorName || 'N/A';
      qs('#addToCart').setAttribute('data-id', product.Id);
    } else {
      document.body.innerHTML = "<h2>Product not found</h2>";
    }
  } catch (error) {
    console.error('Error loading product:', error);
    document.body.innerHTML = "<h2>Error loading product</h2>";
  }
}

renderProductDetails();