import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";


export default function ShoppingCart() {
  const outputEl = document.querySelector(".product-list");

  outputEl.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("quantity-btn")) {
      const action = target.dataset.action;
      const parent = target.closest(".cart-card");
      const quantityEl = parent.querySelector(".cart-card__quantity");
      let quantity = parseInt(quantityEl.textContent);
      const itemIndex = parseInt(parent.dataset.index);
      const cartItems = getLocalStorage("so-cart");
      
      if (action === "increase") {
        quantity++;
        cartItems[itemIndex].quantity = quantity;
      } else if (action === "decrease" && quantity > 1) {
        quantity--;
        cartItems[itemIndex].quantity = quantity;
      } else if (action === "delete") {
        cartItems.splice(itemIndex,1);
      }

      quantityEl.textContent = quantity;
      setLocalStorage("so-cart", cartItems);
      updateCart();
    }
  });

  // Function to update cart total
  function updateCart() {
    const cartItems = getLocalStorage("so-cart");
    const total = calculateCartTotal(cartItems);
    const cartFooter = document.querySelector(".cart-footer");
    if (cartItems.length > 0) {
      cartFooter.classList.add("cart-has-items");
      updateCartTotal(total);
    } else {
      cartFooter.classList.remove("cart-has-items");
      updateCartTotal(0);
      const mensaje = document.querySelector("#mis-pedidos");
      mensaje.textContent = 'Aún no tienes pedidos agregados';
    }
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  }

  // Function to calculate cart total
  function calculateCartTotal(cartItems) {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.Precio * item.quantity;
    });
    return total;
  }

  // Function to update cart total in the UI
  function updateCartTotal(total) {
    const cartTotalElement = document.querySelector(".cart-total");
    cartTotalElement.textContent = `Total: BOB. ${total}`;
  }

  // Cart item template
  function cartItemTemplate(item, index) {
    return `<li class="cart-card divider" data-index="${index}">
      <a href="#" class="cart-card__image">
        <img src="${item.Imagen}" alt="${item.NombreProcedimiento}" /> 
      </a>
      <a href="#">
        <h2 class="card__name">${item.NombreProcedimiento}</h2>
      </a>
      <div class="quantity-controls">
        <button class="quantity-btn" data-action="decrease">-</button>
        <p class="cart-card__quantity">${item.quantity}</p>
        <button class="quantity-btn" data-action="increase">+</button>
        <button class="quantity-btn delete" data-action="delete">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>_</button>
      </div>
      <p class="cart-card__price">BOB. ${item.Precio}</p>
    </li>`;
  }

  // Initial update
  updateCart();
}
