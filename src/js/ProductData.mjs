function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category) {
  const res = await fetch(`../json/${category}.json`);
  const data = await convertToJson(res);
  return data;
}

export async function findProductById(id, category) {
  const products = await getData(category);
  return products.find((item) => {
    return item.Id === id;
  });
}

export async function checkout(payload) {
  const fs = require('fs');
  const data = await JSON.stringify(payload);
  fs.writeFile('../json/pedidos.json', data, (error)=>{
    if(error) throw error;
    console.log('Informacion Recibida');
  })
}