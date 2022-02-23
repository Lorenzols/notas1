const mongoose = require('mongoose');

const notasSchema = mongoose.Schema({
    title: { type: String, require: true, minLength: 3},
    description: {type: String, require: true, minLength:3},
    user_id: {type: mongoose.ObjectId, ref:'Users'}
})

module.exports = mongoose.model('Notas', notasSchema)