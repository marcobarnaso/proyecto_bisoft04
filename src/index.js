const express = require("express");
//require("./db/mongoose");
//const userRouter = require("../src/db/routes/usuario");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//app.use(userRouter);

app.listen(port, () => {
  console.log(`Servidor local está arriba y andando en el puerto ${port}`);
});
