export default class ProductsDTO {
  constructor({ id, name, price, stock }) {
    this.id = id;
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
