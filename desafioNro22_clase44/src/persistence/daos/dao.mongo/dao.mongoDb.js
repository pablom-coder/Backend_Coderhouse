import mongoose from "mongoose";
import config from "../../../config/index.js";

mongoose.set("strictQuery", false);

export default class DaoMongoDB {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
    this.initDB = mongoose.connect(config.MONGO_ATLAS, () =>
      console.log("Conectado a mongoDB")
    );
  }

  async initMongoDB() {
    return this.initDB;
  }

  async save(doc) {
    try {
      const document = await this.collection.create(doc);
      return document;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const docs = await this.collection.find({});
      return docs;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(id, name, price, stock) {
    try {
      let producto = await this.collection.findOne({ id: id });
      console.log(producto);
      console.log(producto._id);
      const docUpdated = await this.collection.findByIdAndUpdate(
        producto._id,
        { name, price, stock },
        { new: true }
      );
      return docUpdated;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(id) {
    try {
      const doc = await this.collection.findOne({ id: id });
      await this.collection.findByIdAndDelete(doc._id);
      return doc;
    } catch (error) {
      console.log(error);
    }
  }
}
