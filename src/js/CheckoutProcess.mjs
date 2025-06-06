import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

const taxRate = 0.06;

function packageItems(items) {
  return items.map(item => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity || 1
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key) || [];
    this.services = new ExternalServices();
  }

  displayOrderSummary() {
    if (!this.list || this.list.length === 0) {
      console.warn("Cart is empty or not loaded.");
      return;
    }

    const subtotal = this.list.reduce(
      (acc, item) => acc + (parseFloat(item.FinalPrice) * (item.quantity || 1)),
      0
    );
    const tax = subtotal * taxRate;
    const shipping = 10 + (this.list.length - 1) * 2;
    const orderTotal = subtotal + tax + shipping;

    document.querySelector(`${this.outputSelector} .subtotal`).textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} .tax`).textContent = `$${tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} .shipping`).textContent = `$${shipping.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} .order-total`).textContent = `$${orderTotal.toFixed(2)}`;

    this.subtotal = subtotal;
    this.tax = tax;
    this.shipping = shipping;
    this.orderTotal = orderTotal;
  }

  async checkout(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const order = {
      orderDate: new Date().toISOString(),
      fname: data.fname,
      lname: data.lname,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
      cardNumber: data.cardNumber,
      expiration: data.expiration,
      code: data.code,
      items: packageItems(this.list),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };

    try {
      const response = await this.services.checkout(order);
      console.log("Order submitted:", response);
      // Optional: redirect or show success message
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  }
}