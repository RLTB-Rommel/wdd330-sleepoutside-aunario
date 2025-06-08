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

function isCardExpired(expiration) {
  const [month, year] = expiration.split("/").map(Number);
  if (!month || !year) return true;
  const expDate = new Date(2000 + year, month);
  return new Date() >= expDate;
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

    qs(".subtotal").textContent = `$${subtotal.toFixed(2)}`;
    qs(".tax").textContent = `$${tax.toFixed(2)}`;
    qs(".shipping").textContent = `$${shipping.toFixed(2)}`;
    qs(".order-total").textContent = `$${orderTotal.toFixed(2)}`;

    this.subtotal = subtotal;
    this.tax = tax;
    this.shipping = shipping;
    this.orderTotal = orderTotal;
  }

  async checkout(form) {
    const data = Object.fromEntries(new FormData(form).entries());

    if (isCardExpired(data.expiration)) {
      alertMessage("Card is expired. Please enter a valid expiration date.");
      return;
    }

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
      const message = err?.message?.message || err?.message || "Unexpected error. Please try again.";
      alertMessage(message);
    }
  }
}