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

export async function updateProductById(id, name, price, stock) {
  const prod = await PR.updateProductById(id, name, price, stock);
  return prod;
}

export async function deleteProductById(id) {
  const prod = await PR.deleteProductById(id);
  return prod;
}
