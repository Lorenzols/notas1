const mongoose = require('mongoose')

// const mongoDB = 'mongodb://127.0.0.1/notas2'

const mongoDB = process.env.MONGO_PROD


const DATABASE_NAME = process.env.DATABASE_NAME || 'azure-todo-app-no-voy';

mongoose.connect(mongoDB, {
    dbName: DATABASE_NAME,
    useNewUrlParser: true, 
    useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', console.error.bind("error DB"))
db.once('open',() => {
    console.log("Conectado a mongoDB")
})
