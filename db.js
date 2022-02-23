const mongoose = require('mongoose')

// const mongoDB = 'mongodb://127.0.0.1/notas2'

let mongoDB = ""


if(process.env.NODE_ENV == 'produccion'){
    mongoDB = process.env.MONGO_PROD
    console.log("produccion: ",process.env.MONGO_PROD)
}else{
    mongoDB = process.env.MONGO_DEV
    console.log("dev: ",process.env.MONGO_DEV)

}

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', console.error.bind("error DB"))
db.once('open',() => {
    console.log("Conectado a mongoDB")
})
