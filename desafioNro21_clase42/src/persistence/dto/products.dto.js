export default class ProductsDTO {
  constructor({ name, price, stock }) {
    this.name = name;
    this.price = price;
  }
}

export function asDto(data) {
  if (Array.isArray(data)) {
    return data.map((product) => new ProductsDTO(product));
  } else {
    return new ProductsDTO(data);
  }
}
