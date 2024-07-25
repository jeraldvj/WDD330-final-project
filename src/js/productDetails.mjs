import { findProductById } from "./ProductData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId, productCategory) {
  try {
    // Attempt to get the product details
      product = await findProductById(productId, productCategory);
    // Render product details and add event listener if product exists
    
      if (product) {
      renderProductDetails();
      document.getElementById("addToCart").addEventListener("click", addToCart);
      document.getElementById("addToCart").style.display = "block"; // Show add button
      } else {
          throw new Error("Product not found"); // Throw error if product doesn't exist
      }
  } catch (error) {
      document.getElementById("addToCart").style.display = "none"; // Hide add button
      // Display error message to user
      document.getElementById("productDetail").innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function addToCart() {
  let cartItems = getLocalStorage("so-cart") || [];
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }
    const existingItemIndex = cartItems.findIndex((item) => item.Id === product.Id);
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  setLocalStorage("so-cart", cartItems);
  alert(`${product.NombreProcedimiento} esta ahora agregado a tus pedidos.`);
}


function renderProductDetails() {
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NombreProcedimiento;
  document.querySelector("#productImage").src = product.Imagen;
  document.querySelector("#productImage").alt = product.NombreProcedimiento;
  document.querySelector("#productFinalPrice").innerText = `Precio: ${product.Precio} Bolivianos`;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.Descripcion;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

