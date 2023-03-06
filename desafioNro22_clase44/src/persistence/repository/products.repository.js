import { getDao } from "../daos/factory.js";
import { asDto } from "../dto/products.dto.js";

export default class ProductsRepository {
  constructor() {
    this.dao = getDao();
  }

  async save(data) {
    try {
      const products = await this.dao.save(data);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const products = await this.dao.getAll();
      const productsDTO = asDto(products);
      console.log(productsDTO);
      return productsDTO;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(id, name, price, stock) {
    const prod = await this.dao.updateProductById(id, name, price, stock);
    return prod;
  }

  async deleteProductById(id) {
    const prod = await this.dao.deleteProductById(id);
    return prod;
  }
}
