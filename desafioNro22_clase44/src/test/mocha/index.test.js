import { productsModel } from "../../persistence/daos/dao.mongo/schema/products.schema.js";
import mongoose from "mongoose";
import app from "../../index.js";
import request from "supertest";
import chai from "chai";
var expect = chai.expect;

describe("Tests server products", () => {
  beforeEach(async () => {
    await mongoose.connection.collections["productos"].drop();
  });

  it("add product", async () => {
    const doc = {
      id: "10",
      name: "Remera Adidas test",
      price: "400",
      stock: "8",
    };
    const response = await request(app).post("/api/add").send(doc);
    expect(response.statusCode).to.equal(200);
    expect(response.body.name).to.equal(doc.name);
    expect(response.body.price).to.equal(doc.price);
  });

  it("get all products", async () => {
    const doc = {
      id: "10",
      name: "Remera Adidas Test",
      price: "400",
      stock: "8",
    };

    await productsModel.create(doc);
    const response = await request(app).get("/api/list");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0].name).to.equal(doc.name);
  });

  it("update products", async () => {
    const doc = {
      id: "10",
      name: "Remera Nike Test",
      price: "200",
      stock: "6",
    };
    const responseNew = await productsModel.create(doc);
    const docUpdated = {
      name: "Remera Nike Test Actualizada",
      price: "250",
      stock: "16",
    };
    const response = await request(app).put("/api/10").send(docUpdated);
    expect(response.statusCode).to.equal(200);
  });

  it("delete Products", async () => {
    const doc = {
      id: "10",
      name: "Remera Nike Test",
      price: "200",
      stock: "6",
    };
    const responseCreate = await productsModel.create(doc);
    const response = await request(app).delete("/api/10");
    expect(response.statusCode).to.equal(200);
  });
});
