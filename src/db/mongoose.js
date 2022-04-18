const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> {
  console.log('Base de datos conectada.')
}).catch((err)=>{
  console.error(`Error conectando a la base de datos.${err}`)
})

