const express = require("express");
const http = require("http");
const mainRouter = require("../routes/index");
const path = require("path");
const { productObj, productArray } = require("../controller/productosApi");

const app = express();
const server = http.Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const viewsFolderPath = path.resolve(__dirname, "../../views");
app.set("views", viewsFolderPath);
app.set("view engine", "pug");

app.get("/", async(req, res) => {
  try{
    const filePath = path.resolve(__dirname, "../../productos.json");
              const fileData = await fs.readFile( filePath, "utf-8" );
              const data = JSON.parse( fileData );
    let count = data.length;
    let tieneProductos = count == 0 ? false : true;
    res.render("formulario", { data, tieneProductos });
  }catch (error) {
    return error, "Error";
}
});

app.use("/api", mainRouter);

module.exports = server;