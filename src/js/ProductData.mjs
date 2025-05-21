function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad response from server");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    // Vite serves public/ folder as root (/), so json files go in /public/json/
    this.path = `/json/${encodeURIComponent(this.category)}.json`;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data)
      .catch((err) => {
        console.error(`Failed to load data from ${this.path}:`, err);
        return []; // Return empty array so the app can handle it gracefully
      });
  }

  async findProductById(id) {
    const products = await this.getData();
    const product = products.find((item) => item.Id === id);

    if (!product) {
      console.warn(`Product with id "${id}" not found in ${this.path}`);
    }

    return product;
  }
}