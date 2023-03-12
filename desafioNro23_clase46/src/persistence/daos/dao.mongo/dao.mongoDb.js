import mongoose from "mongoose";
import config from "../../../config/index.js";
import dotenv from "dotenv";
dotenv.config();

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
      const data = await this.collection.find({});
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(id, body) {
    try {
      const response = await this.collection.findByIdAndUpdate(id, body);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(id) {
    try {
      const response = await this.collection.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await this.collection.findById(id);
      return response;
    } catch (error) {
      logger.fatal(error);
    }
  }
}
