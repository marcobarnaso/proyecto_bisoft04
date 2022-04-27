require("dotenv").config();
require("./db/mongoose");

const express = require("express");
const userRouter = require("./routers/usuario");
const serveSite = require("./routers/paginas");
const libroRouter = require("./routers/libro");
const path = require("path");
const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(serveSite);
app.use(libroRouter);
app.use(express.static("resources"));
app.use(express.static("pages"));
app.use("/pages", express.static(path.join(__dirname, "pages")));
app.use("/resources", express.static(path.join(__dirname, "resources")));

app.listen(port, () => {
  console.log(`El Servidor local está arriba y andando en el puerto ${port}.`);
});
