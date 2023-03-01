import DaoFile from "./dao.filesystem/dao.filesystem.js";
import DaoMemory from "./dao.memory/dao.memory.js";
import DaoMongoDb from "./dao.mongo/dao.mongoDb.js";
import { productsSchema } from "./dao.mongo/schema/products.schema.js";

let dao;
let argv = "mongo";
// let argv = process.argv[2];

switch (argv) {
  case "file":
    dao = new DaoFile("./src/daos/filesystem/db.json");
    console.log(argv);
    break;
  case "mongo":
    dao = new DaoMongoDb("productos", productsSchema);
    dao.initMongoDB();
    console.log(argv);
    break;
  default:
    dao = new DaoMemory();
    break;
}

export async function save(obj) {
  return await dao.save(obj);
}

export async function getAll() {
  return await dao.getAll();
}

export async function updateProductById(id, name, price, stock) {
  return await dao.updateProductById(id, name, price, stock);
}

export async function deleteProductById(id) {
  return await dao.deleteProductById(id);
}

export function getDao() {
  console.log(dao);
  return dao;
}
