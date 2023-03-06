import { buildSchema } from "graphql";
import {
  saveController,
  getAllController,
  deleteProductByIdCont,
} from "../../controllers/graphql/products.controllers.js";

export const graphqlSchema = buildSchema(`
    input InputProduct{
        id: String!
        name: String!
        price: String!
        stock: String!
    }    
    type Product{
        id: String!
        name: String
        price: String
        stock: String
    }
    type Query{
        getAllController:[Product]
    }
    type Mutation{
        saveController(data: InputProduct):Product,
        deleteProductByIdCont(id:String!):Product,
    }
`);

export const graphqlRoot = {
  saveController,
  getAllController,
  deleteProductByIdCont,
};
