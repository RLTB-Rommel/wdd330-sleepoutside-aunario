import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, alertMessage } from "./utils.mjs";

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
  constructor(key) {
    this.key = key;
    this.list = getLocalStorage(key) || [];
    this.services = new ExternalServices();
  }

  init() {
    this.displayOrderSummary();
  }

  displayOrderSummary() {
    if (!this.list.length) return;

    const subtotal = this.list.reduce(
      (acc, item) => acc + item.FinalPrice * (item.quantity || 1),
      0
    );
    const tax = subtotal * taxRate;
    const shipping = 10 + (this.list.length - 1) * 2;
    const orderTotal = subtotal + tax + shipping;

    const subtotalElem = document.querySelector(".subtotal");
    const taxElem = document.querySelector(".tax");
    const shippingElem = document.querySelector(".shipping");
    const orderTotalElem = document.querySelector(".order-total");

    if (subtotalElem) subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    if (taxElem) taxElem.textContent = `$${tax.toFixed(2)}`;
    if (shippingElem) shippingElem.textContent = `$${shipping.toFixed(2)}`;
    if (orderTotalElem) orderTotalElem.textContent = `$${orderTotal.toFixed(2)}`;

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
      localStorage.removeItem("so-cart");
      window.location.href = "./success.html";
    } catch (err) {
      console.error("Checkout failed:", err);
      if (err.name === "servicesError") {
        alertMessage(err.message.message || "An error occurred during checkout.");
      } else {
        alertMessage("Unexpected error. Please try again.");
      }
    }
  }
}