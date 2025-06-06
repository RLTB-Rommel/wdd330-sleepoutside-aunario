export default class ExternalServices {
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

  async checkout(order) {
    const url = 'https://wdd330-backend.onrender.com:3000/checkout';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Checkout failed: " + response.statusText);
      }
      return await response.json();
    } catch (err) {
      console.error("Checkout error:", err);
      throw err;
    }
  }
}