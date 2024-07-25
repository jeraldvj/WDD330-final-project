import { getData } from "./ProductData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}&category=${product.categoria}">
    <img
      src="${product.Imagen}"
      alt="Image of ${product.NombreProcedimiento}"
    />
    <h2 class="card__brand">${product.NombreProcedimiento}</h2>
    <h3 class="card__name">${product.Descripcion}</h3>
    <p class="product-card__price">BOB. ${product.Precio}</p></a>
  </li>`;
}

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getData(category);
  // render out the product list to the element

  renderListWithTemplate(productCardTemplate, el, products);

  document.querySelector(".title").innerHTML = category.toUpperCase();
}
  