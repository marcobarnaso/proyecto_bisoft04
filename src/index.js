require("dotenv").config();
require("./db/mongoose");

const express = require("express");
const userRouter = require("./routers/usuario");
const libroRouter = require("./routers/libro");
const autorRouter = require("./routers/autor")
const cors = require('cors')
const path = require("path");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors())
app.use(userRouter);
app.use(libroRouter);
app.use(autorRouter)
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('views', path.join(__dirname, '../templates/views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res)=>{
  res.render('landing')
})

app.get('/admin-autor', (req, res)=>{
  res.render('admin_autor')
})

app.get('/admin-libro', (req, res)=>{
  res.render('admin_libro')
})

app.get('/admin', (req, res)=>{
  res.render('administrador')
})

app.get('/cambio-contrasena', (req, res)=>{
  res.render('cambiar-contrasenna')
})

app.get('/editar-usuario', (req, res)=>{
  res.render('editar-informacion-usuario')
})

app.get('/editar-metodos-pago', (req, res)=>{
  res.render('editar-metodos-de-pago-usuario')
})

app.get('/editar-preferencias', (req, res)=>{
  res.render('editar-preferencias-usuario')
})

app.get('/historial', (req, res)=>{
  res.render('historial-compras-usuario')
})

app.get('/login', (req, res)=>{
  res.render('login')
})

app.get('/nosotros', (req, res)=>{
  res.render('nosotros')
})

app.get('/autor', (req, res)=>{
  res.render('perfil-autor')
})

app.get('/libro', (req, res)=>{
  res.render('perfil-libro')
})

app.get('/usuario', (req, res)=>{
  res.render('perfil-usuario')
})

app.get('/registro', (req, res)=>{
  res.render('registration')
})

app.get('/carrito', (req, res)=>{
  res.render('carrito-de-compras')
})

app.get('/confirmar-compra', (req, res)=>{
  res.render('confirmar-compra')
})

app.get('/catalogo-libros', (req, res)=>{
  res.render('catalogo-libros')
})

app.get('/catalogo-autores', (req, res)=>{
  res.render('catalogo-autores')
})

app.listen(port, () => {
  console.log(`El Servidor local est?? arriba y andando en el puerto ${port}.`);
});
