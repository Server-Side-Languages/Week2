const mongoose = require("mongoose");

const authorsSchema = new mongoose.Schema({
    name: String,
    age: Number,
    conpmay: String,
})

module.exports = mongoose.model('Author', authorsSchema);