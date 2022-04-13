require('dotenv').config()
console.log(process.env)

const express = require("express");
const userRouter = require("../src/db/routes/usuario");
const serveSite = require("../src/db/routes/paginas");
const path = require("path");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(serveSite);
app.use(express.static("resources"));
app.use(express.static("pages"));
app.use("/pages", express.static(path.join(__dirname, "pages")));
app.use("/resources", express.static("resources"));
//app.use(express.static(__dirname + '/resources/css'))
//app.use('/pages',express.static(__dirname + '/pages'))

app.listen(port, () => {
  console.log(`Servidor local está arriba y andando en el puerto ${port}`);
});
