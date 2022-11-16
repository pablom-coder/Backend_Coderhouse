import knex from "knex";
import { dbConfig } from "../options/knexfile.js";
import { Product } from "./product.js";

class ContenedorBase {
  constructor() {
    const environment = process.env.NODE_ENV || "development";
    console.log(`SETTING ${environment} DB`);
    const options = dbConfig[environment];
    this.connection = knex(options);
  }

  async init() {
    this.connection.schema.hasTable("products").then((exists) => {
      if (exists) return;
      console.log("Creamos la tabla productos!");

      return this.connection.schema.createTable(
        "products",
        async (productsTable) => {
          productsTable.increments();
          productsTable.string("title", 100).notNullable();
          productsTable.decimal("value", 10, 2).notNullable();
          productsTable.string("thumbnail", 500).notNullable();
        }
      );
    });

    this.connection.schema.hasTable("messages").then((exists) => {
      if (exists) return;
      console.log("Creamos la tabla mensajes!");

      return this.connection.schema.createTable(
        "messages",
        async (messagesTable) => {
          messagesTable.increments();
          messagesTable.string("email", 100).notNullable();
          messagesTable.string("time", 50).notNullable();
          messagesTable.string("message", 1000).notNullable();
        }
      );
    });
  }

  async getAll(data) {
    try {
      return this.connection(data).select("*");
    } catch (error) {
      throw error;
    }
  }

  async getById(data, id) {
    try {
      if (id) return this.connection(data).where("id", id);
      else return -1;
    } catch (error) {
      throw error;
    }
  }

  async create(data, nuevaData) {
    try {
      return this.connection(data).insert(nuevaData);
    } catch (error) {
      throw error;
    }
  }
}

export const BDProducts = new ContenedorBase();


/* import dotenv from 'dotenv'
dotenv.config()
import knex from 'knex'

const db = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'ecommerce'
    }
});

export default db; */