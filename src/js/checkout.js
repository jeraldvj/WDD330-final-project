import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

// Load header and footer
loadHeaderFooter();

// Initialize checkout process
checkoutProcess.init("so-cart", ".checkout-summary");

// Handle form submit event
document.forms["checkout-form"].addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutProcess.checkout(e.target);
});
