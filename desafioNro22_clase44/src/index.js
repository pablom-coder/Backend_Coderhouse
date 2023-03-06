import config from "./config/index.js";
import express from "express";
import productRouter from "./router/index.js";
import { graphqlHTTP } from "express-graphql";
import {
  graphqlRoot,
  graphqlSchema,
} from "./services/graphql/products.services.js";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlRoot,
    graphiql: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", productRouter);

app.listen(config.PUERTO, () => {
  console.log(` Server Up ${config.PUERTO}`);
});

export default app;
