import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, alertMessage } from "./utils.mjs";

const taxRate = 0.06;

function packageItems(items) {
  return items.map(item => ({
    id: item.Id || item.id,
    name: item.Name || item.name,
    price: item.FinalPrice ?? item.finalPrice ?? item.price ?? 0,
    quantity: item.quantity || 1
  }));
}

function isExpiredCard(expiration) {
  // Expecting format MM/YY
  const [month, year] = expiration.split("/").map(Number);
  if (!month || !year || month < 1 || month > 12) return true;

  const expiryDate = new Date(`20${year}`, month); // first day of next month
  const now = new Date();

  return now >= expiryDate;
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

    const subtotal = this.list.reduce((acc, item) => {
      const price = item.FinalPrice ?? item.finalPrice ?? item.price ?? 0;
      return acc + price * (item.quantity || 1);
    }, 0);

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

    if (isExpiredCard(data.expiration)) {
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

      // Save order data to sessionStorage
      sessionStorage.setItem("recent-order", JSON.stringify(order));

      // Clear cart and reset form
      localStorage.removeItem(this.key);
      form.reset();

      window.location.href = "./success.html";
    } catch (err) {
      console.error("Checkout failed:", err);
      alertMessage("Checkout failed. Please check your inputs or try again later.");
    }
  }
}