import Repository from "../db/persistence.js";
import { productsCollectionName, productsSchema } from "../db/mongoDB/models/products.js";

const productsCollection = new Repository(productsCollectionName, productsSchema);


export const getAllProductos = async () => {
    const products = await productsCollection.getAll()
    return products
}

export const getByIdProduct = async (id) => {
    const product = await productsCollection.getById(id)
    return product
}

