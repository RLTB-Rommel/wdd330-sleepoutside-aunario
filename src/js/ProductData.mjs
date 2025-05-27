export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`; // Load from public/json/
  }

  async getData() {
    try {
      const res = await fetch(this.path);
      if (!res.ok) throw new Error("Bad response");
      return await res.json();
    } catch (err) {
      console.error("Failed to load local JSON:", err);
      return [];
    }
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find(product => product.Id === id);
  }
}