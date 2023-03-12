import ProductsRepository from "../persistence/repository/products.repository.js";

const PR = new ProductsRepository();

export async function saveProducts(data) {
  try {
    const product = await PR.save(data);
    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    const products = await PR.getAll();
    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts(id) {
  try {
    const products = await PR.getProductById(id);
    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductById(id, body) {
  const prod = await PR.updateProductById(id, body);
  return prod;
}

export async function deleteProductById(id) {
  const prod = await PR.deleteProductById(id);
  return prod;
}
