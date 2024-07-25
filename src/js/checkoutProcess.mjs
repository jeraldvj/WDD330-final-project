import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./ProductData.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map(item => ({
    id: item.Id,
    price: parseFloat(item.Precio),
    name: item.NombreProcedimiento,
    quantity: parseInt(item.quantity)
  }));
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key) || [];
    this.calculateItemSummary();
    this.calculateOrderTotal();
  },
  calculateItemSummary: function () {
    for (let item of this.list) {
      const text = document.getElementById("procedimientos");
      const p = document.createElement("p");
      p.textContent = `${item.NombreProcedimiento} X${item.quantity}`;
      text.appendChild(p);
    }
  },
  calculateOrderTotal: function () {
    let totalAmount = 0;
    let totalItems = 0;

    for (let item of this.list) {

      if (item.hasOwnProperty("Precio") && item.hasOwnProperty("quantity")) {
        const price = parseFloat(item.Precio);
        const quantity = parseInt(item.quantity);

        if (!isNaN(price) && !isNaN(quantity)) {
          totalAmount += price * quantity;
          totalItems += quantity;
        } else {
          console.error("Invalid price or quantity for item:", item); // Log any invalid values
        }
      } else {
        console.error("Missing price or quantity for item:", item); // Log missing properties
      }
    }

    this.itemTotal = totalAmount;

    this.orderTotal = (
      parseFloat(this.itemTotal)
    ).toFixed(2);
    console.log("Total calculado:", this.orderTotal); // Log order total
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    document.querySelector(this.outputSelector + " #orderTotal").innerText = "BOB." + parseFloat(this.orderTotal).toFixed(2);
  },
  checkout: function (form) {
    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = checkout(json);
      window.location.href = "../checkout/success.html";
    } catch (err) {
      console.log(err);
    }
  }
};

export default checkoutProcess;