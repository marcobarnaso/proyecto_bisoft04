const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(()=> {
  console.log('Base de datos conectada.')
}).catch((err)=>{
  console.error(`Error conectando a la base de datos. n${err}`)
})
