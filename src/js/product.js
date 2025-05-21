import { getParam, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./testproduct.mjs";

// 1. Get the product ID from the URL query string (?id=...)
const productId = getParam("id");

// 2. Create a ProductData instance for the 'tents' category
const dataSource = new ProductData("tents");

// 3. Create a ProductDetails instance with the ID and data
const product = new ProductDetails(productId, dataSource);

// 4. Initialize the detail page: fetch + render + event setup
product.init();