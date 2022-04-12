const express = require('express')
const userRouter = require("../src/db/routes/usuario");
const serveSite = require('../src/db/routes/paginas')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(serveSite)

app.listen(port, () => {
  console.log(`Servidor local está arriba y andando en el puerto ${port}`);
});
